import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const GET = withAuth(
  async (
    request: Request & { user?: { userId: string; role: string } },
    { params }: { params: { id: string } }
  ) => {
    const userId = request.user?.userId;
    const userRole = request.user?.role;

    if (!userId || !userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dashboardData;

    if (userRole === "admin") {
      // Admin dashboard data
      const [totalUsers, totalProducts, totalOrders, productStats, orderStats] =
        await Promise.all([
          prisma.user.count(),
          prisma.product.count(),
          prisma.order.count(),
          prisma.product.aggregate({ _sum: { price: true } }),
          prisma.order.aggregate({ _sum: { totalPrice: true } }),
        ]);

      dashboardData = {
        role: "admin",
        totalUsers,
        totalProducts,
        totalOrders,
        totalWorth: productStats._sum.price || 0,
        totalSales: orderStats._sum.totalPrice || 0,
      };
    } else {
      // Regular user dashboard data
      const userOrders = await prisma.order.findMany({
        where: { userId },
        include: { orderItems: true },
      });

      const totalOrdersPlaced = userOrders.length;
      const totalProductsPurchased = userOrders.reduce(
        (sum, order) => sum + order.orderItems.length,
        0
      );
      const totalMoneySpent = userOrders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );

      dashboardData = {
        role: "user",
        totalOrdersPlaced,
        totalProductsPurchased,
        totalMoneySpent,
      };
    }

    return NextResponse.json(dashboardData);
  }
);
