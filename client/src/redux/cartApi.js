import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (id) => `/carts/${id}`,
      providesTags: ["cart"],
    }),
    createCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/carts/${id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: (userId) => ({
        url: `/carts/${userId}`,
        method: "delete",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;
