import { Loader2, Star } from "lucide-react";
import { AddReview } from "./add-review";
import { useGetAllReviewsByProductQuery } from "@/redux/api/review";
import { useAppSelector } from "@/redux/hooks";
import { selectUserId } from "@/redux/slice/user";
import Link from "next/link";
import LoadingSkeleton from "../loading-skeleton";

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { data: reviews, isLoading } =
    useGetAllReviewsByProductQuery(productId);
  const userId = useAppSelector(selectUserId);
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-center border-t mt-8 pt-4">
        Customer Reviews
      </h2>
      {!userId ? (
        <p className="text-center text-gray-500">
          You have to{" "}
          <Link href="/login" className="text-blue-500 underline">
            login
          </Link>{" "}
          to review this product
        </p>
      ) : reviews?.every((review) => review.user.id !== userId) ? (
        <AddReview productId={productId} />
      ) : (
        <p className="text-center text-sm italic text-gray-500">
          You have already reviewed this product
        </p>
      )}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        reviews?.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{review.user.name}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-600">{review.description}</p>
          </div>
        ))
      )}
      {reviews?.length === 0 && (
        <p className="text-center text-gray-500">No reviews yet</p>
      )}
    </div>
  );
};
