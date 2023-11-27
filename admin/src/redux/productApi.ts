import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

interface Product {
  title: string;
  description: string;
  image: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/products",
    prepareHeaders: (headers, { getState }: { getState: () => RootState }) => {
      const token = getState().auth?.currentUser?.token;

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
