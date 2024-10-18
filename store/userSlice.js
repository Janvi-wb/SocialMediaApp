import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
  reducers: {
    addCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
      console.log(user, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const currentUser = (state) => state.user.user;
export const currentToken = (state) => state.user.user;

export const { addCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
