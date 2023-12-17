import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/wishlists",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.currentUser?.token;

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["wishlist"],
    }),
    createWishlist: builder.mutation({
      query: (data) => ({
        url: "/",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["wishlist"],
    }),
    updateWishlist: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${userId}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: "delete",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
