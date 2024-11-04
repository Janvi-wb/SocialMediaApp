// allPostsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async ({ page, limit }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get(
//         `http://localhost:8080/api/v1/social-media/posts?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response, "RESPONSE");
//       return response.data.data.posts;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState: {
    allPosts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    appendPostInAllPost: (state, action) => {
      state.allPosts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      state.allPosts = state.allPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
    addNewPost: (state, action) => {
      state.allPosts = [action.payload, ...state.allPosts];
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchPosts.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(fetchPosts.fulfilled, (state, action) => {
  //         state.posts = [...state.posts, ...action.payload];
  //         state.isLoading = false;
  //         state.error = null;
  //         state.page += 1;
  //       })
  //       .addCase(fetchPosts.rejected, (state, action) => {
  //         state.isLoading = false;
  //         state.error = action.payload;
  //       });
  //   },
});

export const { addAllPosts, updatePost, addNewPost, appendPostInAllPost } = allPostsSlice.actions;
export default allPostsSlice.reducer;
