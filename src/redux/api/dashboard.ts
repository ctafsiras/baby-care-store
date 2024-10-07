import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dashboard" }),
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, string>({
      query: (token) => {
        return {
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
