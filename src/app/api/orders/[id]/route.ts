// app/api/orders/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

export const GET = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(order);
  }
);

export const PUT = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    const body = await request.json();
    const { status } = body;

    if (
      !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(
        status
      )
    ) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: params.id } });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: { orderItems: { include: { product: true } } },
    });

    return NextResponse.json(updatedOrder);
  }
);

export const DELETE = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { orderItems: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        { error: "Cannot cancel non-pending order" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id: params.id },
        data: { status: "cancelled" },
      });

      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    });

    return new NextResponse(null, { status: 204 });
  }
);
