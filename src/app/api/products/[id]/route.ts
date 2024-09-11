// app/api/products/[id]/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const productUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
});

export const GET = withAuth(
  async (request: Request, { params }: { params: { id: string } }) => {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  }
);

export const PUT = withAuth(
  async (request: Request, { params }: { params: { id: string } }) => {
    try {
      const body = await request.json();
      const updateData = productUpdateSchema.parse(body);

      const product = await prisma.product.update({
        where: { id: params.id },
        data: updateData,
      });

      return NextResponse.json(product);
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

export const DELETE = withAuth(
  async (request: Request, { params }: { params: { id: string } }) => {
    await prisma.product.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  }
);
