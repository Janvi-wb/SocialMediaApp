import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const postSlice = createSlice({
  name: 'myPosts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload || [];
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setPosts, setStatus, setError } = postSlice.actions;

export default postSlice.reducer;
