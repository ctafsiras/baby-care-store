import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegistrationResponse {
  userId?: string;
  message?: string;
  error?: string;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  error?: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => {
        return {
          url: "/register",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = authApi;
