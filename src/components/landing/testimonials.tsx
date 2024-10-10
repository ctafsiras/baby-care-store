"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Star } from "lucide-react";
import { useGetAllOrderFeedbacksQuery } from "@/redux/api/orderFeedback";
import LoadingSkeleton from "../loading-skeleton";

export default function Testimonials() {
  const { data: feedbacks, isLoading } = useGetAllOrderFeedbacksQuery();
  if (isLoading) return <LoadingSkeleton />;
  return (
    <section className=" w-full py-8 sm:px-4">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-4">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks?.map((feedback, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={feedback.user.image || ""}
                      alt={feedback.user.name || ""}
                    />
                    <AvatarFallback>
                      {feedback.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {feedback.user.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic">&ldquo;{feedback.description}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
