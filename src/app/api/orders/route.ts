// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const orderSchema = z.object({
  items: z.array(orderItemSchema),
});

export const GET = withAuth(
  async (request: Request & { user?: { userId: string; role: string } }) => {
    if (request.user?.role === "admin") {
      const orders = await prisma.order.findMany({
        include: { user: true, orderItems: { include: { product: true } } },
      });
      return NextResponse.json(orders);
    }
    const userId = request.user?.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { user: true, orderItems: { include: { product: true } } },
    });
    return NextResponse.json(orders);
  }
);

export const POST = withAuth(
  async (request: Request & { user?: { userId: string; email: string } }) => {
    try {
      const body = await request.json();

      const { items } = orderSchema.parse(body);
      const userId = request.user?.userId!;

      const order = await prisma.$transaction(async (prisma) => {
        const order = await prisma.order.create({
          data: {
            userId,
            status: "pending",
            totalPrice: 0,
          },
        });

        let totalPrice = 0;

        for (const item of items) {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }

          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }

          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
            },
          });

          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: product.stock - item.quantity },
          });

          totalPrice += product.price * item.quantity;
        }

        return prisma.order.update({
          where: { id: order.id },
          data: { totalPrice },
          include: { orderItems: { include: { product: true } } },
        });
      });

      return NextResponse.json(order, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
