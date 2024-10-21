import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "postSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/social-media/",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
          headers.set('Authorization', `Bearer ${token}`); 
        }
        return headers;
      },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => '/posts',
    }),
  }),
});

export const { useGetAllPostsQuery } = postApiSlice;
