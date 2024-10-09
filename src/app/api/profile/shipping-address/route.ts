import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(
  async (request: Request & { user?: { userId: string; role: string } }) => {
    try {
      const userId = request.user?.userId;
      const addresses = await prisma.deliveryAddress.findMany({
        where: { userId },
      });

      return NextResponse.json(addresses);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to get addresses" },
        { status: 500 }
      );
    }
  }
);
export const POST = withAuth(
  async (request: Request & { user?: { userId: string; role: string } }) => {
    try {
      const body = await request.json();
      const userId = request.user?.userId;
      const address = await prisma.deliveryAddress.create({
        data: { ...body, userId },
      });
      return NextResponse.json(address);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create address" },
        { status: 500 }
      );
    }
  }
);
