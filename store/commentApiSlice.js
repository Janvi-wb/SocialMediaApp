import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApiSlice = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/social-media/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ postId }) => `/comments/post/${postId}`,
      providesTags: (result, error, { postId }) =>
        result
          ? [{ type: "Comments", id: postId }]
          : [{ type: "Comments", id: "LIST" }],
    }),

    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/comments/post/${postId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Post", id: postId },
      ],
    }),

    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comments/post/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Post", id: postId },
      ],
    }),

    addCommentLike: builder.mutation({
      query: ({ commentId }) => ({
        url: `/like/comment/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Post", id: postId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useAddCommentLikeMutation,
} = commentApiSlice;
