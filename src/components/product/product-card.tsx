import { ShoppingCart, Star, View } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cart";
import { calculateAverageRating } from "@/lib/averageRating";
import { Product, Review } from "@prisma/client";
import { ProductWithReviews } from "@/redux/api/product";

const ProductCard = ({ product }: { product: ProductWithReviews }) => {
  const dispatch = useAppDispatch();
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
          width={600}
          height={600}
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(calculateAverageRating(product?.reviews))
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {calculateAverageRating(product?.reviews)}/5
          </span>
        </div>
        <p className="text-2xl font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="!px-2" onClick={() => dispatch(addToCart(product))}>
          <ShoppingCart className="mr-1 h-4" /> Add to Cart
        </Button>
        <Link className="" href={`/products/${product.id}`}>
          <Button className="!px-2" variant="outline">
            <View className="mr-1 h-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
