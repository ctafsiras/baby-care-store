import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const orderFeedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  description: z.string().min(10).max(500),
});

export const GET = withAuth(
  async (
    request: NextRequest & { user?: { userId: string; role: string } },
    { params }: { params: { orderId: string } }
  ) => {
    try {
      const orderFeedback = await prisma.orderFeedback.findUnique({
        where: {
          orderId: params.orderId,
          userId: request.user?.userId,
        },
      });

      return NextResponse.json(orderFeedback, { status: 200 });
    } catch (error) {
      console.error("Error fetching order feedbacks:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);

export const POST = withAuth(
  async (
    request: NextRequest & { user?: { userId: string; role: string } },
    { params }: { params: { orderId: string } }
  ) => {
    try {
      const body = await request.json();
      const { rating, description } = orderFeedbackSchema.parse(body);

      if (!request.user?.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const orderFeedback = await prisma.orderFeedback.create({
        data: {
          rating,
          description,
          userId: request.user.userId,
          orderId: params.orderId,
        },
      });

      return NextResponse.json(orderFeedback, { status: 201 });
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
