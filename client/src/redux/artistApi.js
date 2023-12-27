import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistApi = createApi({
  reducerPath: "artist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/artists",
  }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: (type) => (type ? `?type=${type}` : "/"),
    }),
  }),
});

export const { useGetArtistsQuery } = artistApi;
