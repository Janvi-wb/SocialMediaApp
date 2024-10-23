// allPostsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `http://localhost:8080/api/v1/social-media/posts?page=${page}&limit=${limit}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "RESPONSE");
      return response.data.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState: {
    posts: [],
    page: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload];
        state.isLoading = false;
        state.error = null;
        state.page += 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPosts } = allPostsSlice.actions;
export default allPostsSlice.reducer;
