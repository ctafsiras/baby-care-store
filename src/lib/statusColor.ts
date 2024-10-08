"use client";
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Shipped":
      return "bg-green-100 text-green-800";
    case "Delivered":
      return "bg-emerald-100 text-emerald-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
