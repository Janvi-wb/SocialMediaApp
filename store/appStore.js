import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { authApiSlice } from "./authApiSlice";
import { profileApiSlice } from "./profileApiSlice";
import { postApiSlice } from "./postApiSlice";
import profileReducer from "./profileSlice";
import postReducer from "./postSlice";
import allPostsReducer from "./allPostsSlice";
import { commentApiSlice } from "./commentApiSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    myPosts: postReducer,
    allPosts: allPostsReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [commentApiSlice.reducerPath]: commentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      postApiSlice.middleware,
      commentApiSlice.middleware,
    ),
});

export default appStore;
