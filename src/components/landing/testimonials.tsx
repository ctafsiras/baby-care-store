import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Fatema Rahman",
      avatar: "",
      review:
        "The quality of the baby clothes from this shop is amazing. I was quite skeptical at first because I hadn't shopped for baby items online in Bangladesh before. But when I received the package, I was pleasantly surprised. The fabric is so soft, breathable, and perfect for the weather here. My baby is very comfortable in them, and I’ve already recommended this shop to other mothers in my community. I’ll definitely be coming back for more!",
      rating: 5,
    },
    {
      name: "Farhan Ahmed",
      avatar: "",
      review:
        "I was impressed with how quickly my order arrived. In Bangladesh, delivery services can often be unreliable, but the customer service here was fantastic. They even followed up with a call to confirm my order. The quality of the product is as promised, and I can see myself becoming a regular customer. It’s rare to find a place that combines great service, fast delivery, and quality products all in one.",
      rating: 4,
    },
    {
      name: "Ayesha Siddique",
      avatar: "",
      review:
        "We bought a baby monitor, and it has made our lives so much easier. As a working mom, I am often in different parts of the house, and being able to check on my baby with just a glance at the monitor is a relief. The features are perfect for the needs of a busy household in Dhaka. From the range to the quality of the audio and video, it’s exactly what we were looking for. I wish I had bought it earlier!",
      rating: 5,
    },
  ];

  return (
    <section className=" w-full py-8 sm:px-4">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-4">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{review.review}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
