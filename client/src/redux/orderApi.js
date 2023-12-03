import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.currentUser?.token;

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => `/orders/user/${userId}`,
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    getOrderBySession: builder.query({
      query: (id) => `/orders/session/${id}`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        body: data,
        method: "post",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderBySessionQuery,
  useCreateOrderMutation,
} = orderApi;
