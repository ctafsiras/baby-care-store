import React from "react";
import { ShoppingCart, Box, Truck, Smile } from "lucide-react";

const steps = [
  {
    icon: <ShoppingCart className="text-3xl text-blue-500" />,
    title: "Place Your Order",
    description: "Browse our collection and add items to your cart.",
  },
  {
    icon: <Box className="text-3xl text-green-500" />,
    title: "Order Processing",
    description:
      "We carefully package your items to ensure they arrive safely.",
  },
  {
    icon: <Truck className="text-3xl text-yellow-500" />,
    title: "Shipping",
    description: "Your order is on its way to you with our trusted carriers.",
  },
  {
    icon: <Smile className="text-3xl text-red-500" />,
    title: "Delivery",
    description: "Receive your package and enjoy your new items!",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-8 md:mb-0 w-full md:w-1/4"
            >
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-full h-1 bg-gray-300 hidden md:block" />
                )}
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center z-10 relative">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-center text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
