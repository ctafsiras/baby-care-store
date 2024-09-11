// app/api/products/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

export const GET = withAuth(async () => {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
});

export const POST = withAuth(async (request: Request) => {
  try {
    const body = await request.json();
    const { name, description, price, stock } = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
