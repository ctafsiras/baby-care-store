export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "bg-yellow-300";
    case "Processing":
      return "bg-blue-300";
    case "Shipped":
      return "bg-green-300";
    case "Delivered":
      return "bg-green-500";
    case "Cancelled":
      return "bg-red-300";
    default:
      return "bg-gray-300";
  }
};
