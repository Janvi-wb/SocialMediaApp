import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/users/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (Credential) => ({
        url: "/login",
        method: "POST",
        body: Credential,
      }),
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
