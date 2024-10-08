"use client";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetDashboardDataQuery } from "@/redux/api/dashboard";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import {Loader2} from "lucide-react";

const DashboardOverview: React.FC = () => {
  const token = useAppSelector(selectToken);
  const { data, isLoading, isError } = useGetDashboardDataQuery(
    token as string
  );

  if (isLoading) return <Loader2 className="mx-auto size-10 h-full my-auto animate-spin" />;


  if (!data) return <div>No data</div>;

  const isAdmin = data.role === "admin";

  const cardData = isAdmin
    ? [
        { title: "Total Users", value: data.totalUsers, color: "bg-blue-500" },
        {
          title: "Total Products",
          value: data.totalProducts,
          color: "bg-pink-500",
        },
        {
          title: "Total Orders",
          value: data.totalOrders,
          color: "bg-green-500",
        },
        {
          title: "Total Worth",
          value: `$${data.totalWorth.toFixed(2)}`,
          color: "bg-orange-500",
        },
      ]
    : [
        {
          title: "Orders Placed",
          value: data.totalOrdersPlaced,
          color: "bg-blue-500",
        },
        {
          title: "Products Purchased",
          value: data.totalProductsPurchased,
          color: "bg-pink-500",
        },
        {
          title: "Total Spent",
          value: `$${data.totalMoneySpent.toFixed(2)}`,
          color: "bg-green-500",
        },
      ];

  const barChartData = isAdmin
    ? [
        { name: "Users", value: data.totalUsers },
        { name: "Products", value: data.totalProducts },
        { name: "Orders", value: data.totalOrders },
      ]
    : [
        { name: "Orders", value: data.totalOrdersPlaced },
        { name: "Products", value: data.totalProductsPurchased },
      ];

  const pieChartData = isAdmin
    ? [
        { name: "Total Worth", value: data.totalWorth },
        { name: "Total Sales", value: data.totalSales },
      ]
    : [{ name: "Total Spent", value: data.totalMoneySpent }];

  const COLORS = ["#3b82f6", "#ec4899", "#22c55e", "#f97316"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-5xl text-center font-bold">
        Dashboard Overview
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
          <Card key={index} className={`${card.color} text-white`}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {isAdmin ? "Overview Statistics" : "Your Activity"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pie Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
