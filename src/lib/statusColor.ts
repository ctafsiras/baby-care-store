"use client";
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100";
    case "Processing":
      return "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100";
    case "Shipped":
      return "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100";
    case "Delivered":
      return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100";
    case "Cancelled":
      return "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100";
  }
};
