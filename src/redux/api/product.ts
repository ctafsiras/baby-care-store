import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query<Product, string>({
      query: (productId) => {
        return {
          url: `/${productId}`,
          method: "GET",
        };
      },
    }),
    addProduct: builder.mutation<
      Product,
      { product: Partial<Product>; token: string }
    >({
      query: (data) => {
        return {
          url: "/",
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.product,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, { productId: string; token: string }>(
      {
        query: (data) => {
          return {
            url: `/${data.productId}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          };
        },
        invalidatesTags: ["Products"],
      }
    ),
    updateProduct: builder.mutation<
      Product,
      { product: Partial<Product>; token: string }
    >({
      query: (data) => {
        return {
          url: `/${data.product.id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.product,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
