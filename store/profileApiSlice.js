import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/social-media/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("origin","http://localhost:5173")
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userName) => (userName ? `/profile/u/${userName}` : `/profile`),
      providesTags: (result, error, userName) =>
        result ? [{ type: "Profile", id: userName }] : []
    }),

    followUnfollowUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/follow/${userId}`,
        method: "POST",
      }),
    }),

    followingUser: builder.query({
      query: (userName) => `/follow/list/following/${userName}`,
    }),

    followersUser: builder.query({
      query: (userName) => `/follow/list/followers/${userName}`,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { userName }) => [{ type: 'Profile', id: userName }],
    }),

    getBookmarkedPosts: builder.query({
      query: () => ({
        url: "/bookmarks",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useFollowUnfollowUserMutation,
  useFollowingUserQuery,
  useFollowersUserQuery,
  useUpdateProfileMutation,
  useGetBookmarkedPostsQuery,
} = profileApiSlice;
