import DashboardOverview from "@/components/dashboard-overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Care Store Dashboard",
  description:
    "Your personalized dashboard for managing your baby care products and orders",
};

const Page = () => {
  return (
    <div className="">
      <DashboardOverview />
    </div>
  );
};

export default Page;
