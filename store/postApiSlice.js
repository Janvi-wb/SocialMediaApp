import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "postSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/social-media/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      //console.log(token, "TOKEN");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => `/posts?page=1&limit=20`,
    }),
    getMyPosts: builder.query({
      query: (userName) =>
        userName
          ? `/posts/get/u/${userName}?page=1&limit=10`
          : `/posts/get/my?page=1&limit=10`,
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `like/post/${postId}`,
        method: "POST",
      }),
    }),
    bookmarkPost: builder.mutation({
      query: (postId) => ({
        url: `bookmarks/${postId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useLikePostMutation,
  useBookmarkPostMutation,
} = postApiSlice;
