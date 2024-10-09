import { toast } from "@/hooks/use-toast";
import { Review, User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ReviewWithUser extends Review {
  user: User;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products/review",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getAllReviewsByProduct: builder.query<ReviewWithUser[], string>({
      query: (productId) => {
        return {
          url: `/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation<
      Review,
      {
        token: string;
        productId: string;
        review: { rating: number; description: string };
      }
    >({
      query: (data) => {
        return {
          url: `/${data.productId}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.review,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          if (meta?.response?.status === 201) {
            toast({
              title: "Review Created",
              description: "Your review has been successfully added.",
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was an error adding your review.",
          });
        }
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useGetAllReviewsByProductQuery, useAddReviewMutation } =
  reviewApi;
