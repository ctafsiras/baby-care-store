import { Order, Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface OrderInput {
  token: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/orders",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, OrderInput>({
      query: (data) => {
        return {
          url: "/",
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: { items: data.items },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateOrderMutation } = orderApi;
