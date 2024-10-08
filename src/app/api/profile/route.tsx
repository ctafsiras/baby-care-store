import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    console.log("userId for testing", userId);
    const user = await prisma?.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }
);
export const PUT = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    const body = await request.json();
    const user = await prisma?.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updatedUser = await prisma?.user.update({
      where: { id: userId },
      data: body,
    });

    return NextResponse.json(updatedUser);
  }
);
