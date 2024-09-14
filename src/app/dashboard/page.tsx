import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Care Store Dashboard",
  description:
    "Your personalized dashboard for managing your baby care products and orders",
};

const Page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1
          className="text-5xl font-bold mb-4 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          Welcome to Baby Care Store Dashboard
        </h1>
      </div>
    </div>
  );
};

export default Page;
