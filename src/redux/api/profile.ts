import { Order, Product, User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/profile",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({
      query: (token) => {
        return {
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<
      User,
      { token: string; data: Partial<User> }
    >({
      query: (data) => {
        return {
          url: "/",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.data,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
