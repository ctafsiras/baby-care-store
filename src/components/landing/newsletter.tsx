"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Congratulations! Success",
      description: `You have successfully subscribed to our newsletter! with email: ${email}`,
    });
    setEmail("");
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-blue-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Join Our Baby Care Community
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Sign up for our newsletter and receive exclusive offers, parenting
              tips, and first access to new products.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-pink-600 text-white hover:bg-pink-700"
              >
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-pink-600">
            <Gift className="h-6 w-6" />
            <p className="text-lg font-semibold">
              Get 10% off your first order!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
