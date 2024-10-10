import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Clothing",
      icon: "👕",
      description: "Adorable outfits for every occasion",
    },
    { name: "Feeding", icon: "🍼", description: "Everything for meal time" },
    {
      name: "Diapering",
      icon: "🧷",
      description: "Keep your baby clean and comfortable",
    },
    { name: "Toys", icon: "🧸", description: "Fun and educational playthings" },
    { name: "Health", icon: "🩺", description: "Essential care products" },
    { name: "Travel", icon: "🚗", description: "On-the-go baby gear" },
  ];

  return (
    <section id="featured" className="w-full py-8 sm:px-4">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl font-bold tracking-tighter sm:text-3xl text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href="#featured">
              <Card className="group hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
