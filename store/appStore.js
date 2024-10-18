import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { authApiSlice } from "./authApiSlice";
import { profileApiSlice } from "./profileApiSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, profileApiSlice.middleware), 
});

export default appStore;
