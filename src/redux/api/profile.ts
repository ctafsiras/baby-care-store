import { DeliveryAddress, Order, Product, User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "@/hooks/use-toast";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/profile",
  }),
  tagTypes: ["Profile", "ShippingAddress"],
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
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast({
            title: "Profile Loaded",
            description: "Your profile has been successfully loaded.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error Loading Profile",
            description: "There was an error loading your profile.",
          });
        }
      },
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
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Update Failed",
            description: "There was an error updating your profile.",
          });
        }
      },
    }),
    getShippingAddresses: builder.query<DeliveryAddress[], string>({
      query: (token) => {
        return {
          url: "/shipping-address",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["ShippingAddress"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast({
            title: "Shipping Addresses Loaded",
            description:
              "Your shipping addresses have been successfully loaded.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error Loading Addresses",
            description: "There was an error loading your shipping addresses.",
          });
        }
      },
    }),
    addShippingAddress: builder.mutation<
      DeliveryAddress,
      { token: string; data: Partial<DeliveryAddress> }
    >({
      query: (data) => {
        return {
          url: "/shipping-address",
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: data.data,
        };
      },
      invalidatesTags: ["ShippingAddress"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast({
            title: "Address Added",
            description:
              "Your new shipping address has been successfully added.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error Adding Address",
            description: "There was an error adding your new shipping address.",
          });
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetShippingAddressesQuery,
  useAddShippingAddressMutation,
} = userApi;
