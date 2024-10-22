import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "postSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/social-media/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
    }),
    getMyPosts: builder.query({
      query: () => "/posts/get/my",
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetAllPostsQuery, useGetMyPostsQuery } = postApiSlice;
