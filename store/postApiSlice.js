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
      query: ({page, limit}) => `/posts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
            ? result.data.posts.map(({ id }) => ({ type: 'Post', id })) // Provide tags for each post
            : [],
    }),
    getPostById: builder.query({
        query: (postId) => `/posts/${postId}`,
        providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
    }),
    getMyPosts: builder.query({
      query: (userName) =>
        userName
          ? `/posts/get/u/${userName}?page=1&limit=20`
          : `/posts/get/my?page=1&limit=20`,
    }),
    addPost : builder.mutation({
      query: (data) => ({
          url: `/posts`,
          method: 'POST',
          body: data,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
  }),

    likePost: builder.mutation({
      query: (postId) => ({
        url: `like/post/${postId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    bookmarkPost: builder.mutation({
      query: (postId) => ({
        url: `bookmarks/${postId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }], 
    }),
    deleteMyPost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
    getPostsByTag: builder.query({
      query: (tag) => `posts/get/t/${tag}?page=1&limit=10`
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useAddPostMutation,
  useLikePostMutation,
  useBookmarkPostMutation,
  useDeleteMyPostMutation,
  useGetPostsByTagQuery
} = postApiSlice;
