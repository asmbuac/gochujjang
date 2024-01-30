import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistApi = createApi({
  reducerPath: "artist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/artists",
  }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: ({ type, name }) => {
        let params = "?";

        if (type) {
          if (Array.isArray(type)) {
            params += `type=${type[0]}`;
            for (const item of type.slice(1)) {
              params += `&type=${item}`;
            }
          } else {
            params += `type=${type}`;
          }
        }
        if (name) {
          type && (params += "&");
          params += `name=${name}`;
        }

        return params;
      },
    }),
    getArtist: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistQuery } = artistApi;
