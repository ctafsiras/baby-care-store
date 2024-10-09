import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  description: z.string().min(10).max(500),
});

export const GET = async (
  request: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: params.productId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = withAuth(
  async (
    request: NextRequest & { user?: { userId: string; role: string } },
    { params }: { params: { productId: string } }
  ) => {
    try {
      const body = await request.json();
      const { rating, description } = reviewSchema.parse(body);

      if (!request.user?.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const review = await prisma.review.create({
        data: {
          rating,
          description,
          userId: request.user.userId,
          productId: params.productId,
        },
      });

      return NextResponse.json(review, { status: 201 });
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
