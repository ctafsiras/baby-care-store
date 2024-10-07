import { Order, Product, User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface OrderInput {
  token: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
interface OrderWithUser extends Order {
  user: User;
  orderItems: {
    product: Product;
    quantity: number;
  }[];
}
// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/orders",
  }),
  tagTypes: ["Orders"],
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
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query<OrderWithUser[], string>({
      query: (token) => {
        return {
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      // keepUnusedDataFor: 0,
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation<
      Order,
      { token: string; id: string; status: string }
    >({
      query: (data) => {
        return {
          url: `/${data.id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: { status: data.status },
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
