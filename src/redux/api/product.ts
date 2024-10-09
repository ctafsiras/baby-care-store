import { Product, Review } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProductWithReviews extends Product {
  reviews: Review[];
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductWithReviews[], void>({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getLatestProducts: builder.query<Product[], number>({
      query: (limit) => {
        return {
          url: `/?latest=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getBestProducts: builder.query<ProductWithReviews[], number>({
      query: (limit) => {
        return {
          url: `/?best=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query<ProductWithReviews, string>({
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
  useGetLatestProductsQuery,
  useGetBestProductsQuery,
} = productApi;
