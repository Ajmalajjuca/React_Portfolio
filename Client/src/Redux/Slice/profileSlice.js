import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  editedProfile: null,
  isLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setEditedProfile: (state, action) => {
      state.editedProfile = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getProfile, setProfile, setEditedProfile, setProfileLoading, setProfileError } = profileSlice.actions;
export default profileSlice.reducer;