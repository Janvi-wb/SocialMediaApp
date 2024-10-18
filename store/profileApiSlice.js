import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
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
    getProfile: builder.query({
      query: () => '/profile',
    }),
  }),
});

export const { useGetProfileQuery } = profileApiSlice;
