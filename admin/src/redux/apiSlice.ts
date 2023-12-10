import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { Order, Product, User } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }: { getState: () => RootState }) => {
      const token = getState().auth?.currentUser?.token;

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: 30,
  tagTypes: ["list"],
  endpoints: (builder) => ({
    getRows: builder.query<object[], string>({
      query: (slug) => `/${slug}`,
      providesTags: (result, error, slug: string) => {
        return error
          ? [{ type: "list", id: slug, error: true }]
          : [{ type: "list", id: slug }];
      },
    }),
    deleteRow: builder.mutation<String, { slug: string; id: string }>({
      query: ({ slug, id }) => ({
        url: `/${slug}/${id}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "list", id: slug },
      ],
    }),
    createRow: builder.mutation<
      Product | Order | User,
      { slug: string; data: Product | Order | User }
    >({
      query: ({ slug, data }) => ({
        url: `/${slug}`,
        body: data,
        method: "post",
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "list", id: slug === "auth/register" ? "users" : slug },
      ],
    }),
    updateRow: builder.mutation<
      Product | Order | User,
      { slug: string; id: string; data: Product | Order | User }
    >({
      query: ({ slug, id, data }) => ({
        url: `/${slug}/${id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "list", id: slug },
      ],
    }),
  }),
});

export const {
  useGetRowsQuery,
  useDeleteRowMutation,
  useCreateRowMutation,
  useUpdateRowMutation,
} = api;
