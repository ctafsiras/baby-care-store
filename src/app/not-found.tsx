import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home, RefreshCw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Baby Care Store",
  description: "Baby Care Store - Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center text-center px-4">
      <Ghost className="w-24 h-24 text-blue-500 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-4">
        Oops! Looks like this page took a vacation without telling us.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Things you can do:
        </h2>
        <ul className="text-left text-gray-600 space-y-2">
          <li className="flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
            Refresh the page
          </li>
          <li className="flex items-center">
            <Home className="w-5 h-5 mr-2 text-blue-500" />
            Go back to our home page
          </li>
        </ul>
      </div>
      <div className="mt-4 space-x-4">
        <Button asChild>
          <Link href="/">Take Me Home</Link>
        </Button>
      </div>
    </div>
  );
}
