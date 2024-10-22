import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null, 
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setProfile, setLoading, setError, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
