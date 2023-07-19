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
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (id) => `/carts/${id}`,
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        body: data,
        method: "post",
      }),
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/carts/${id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useCreateCartMutation, useUpdateCartMutation } =
  cartApi;
export default cartApi.reducer;
