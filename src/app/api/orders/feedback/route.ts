import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const GET = async () => {
  try {
    const orderFeedbacks = await prisma.orderFeedback.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(orderFeedbacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching order feedbacks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
