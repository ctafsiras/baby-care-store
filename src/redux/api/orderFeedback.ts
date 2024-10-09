import { toast } from "@/hooks/use-toast";
import { OrderFeedback } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderFeedbackApi = createApi({
  reducerPath: "orderFeedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/orders/feedback",
  }),
  tagTypes: ["OrderFeedbacks"],
  endpoints: (builder) => ({
    getOrderFeedbackByOrder: builder.query<
      OrderFeedback,
      { token: string; orderId: string }
    >({
      query: (data) => {
        return {
          url: `/${data.orderId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
      providesTags: ["OrderFeedbacks"],
    }),
    addOrderFeedback: builder.mutation<
      OrderFeedback,
      {
        token: string;
        orderId: string;
        feedback: { rating: number; description: string };
      }
    >({
      query: (data) => {
        return {
          url: `/${data.orderId}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.feedback,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          if (meta?.response?.status === 201) {
            toast({
              title: "Feedback Created",
              description: "Your feedback has been successfully added.",
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was an error adding your feedback.",
          });
        }
      },
      invalidatesTags: ["OrderFeedbacks"],
    }),
  }),
});

export const { useGetOrderFeedbackByOrderQuery, useAddOrderFeedbackMutation } =
  orderFeedbackApi;
