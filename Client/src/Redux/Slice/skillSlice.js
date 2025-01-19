import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  skills: [],
  isLoading: false,
  error: null
};

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    getSkills: (state, action) => {
      state.skills = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      const index = state.skills.findIndex(skill => skill._id === action.payload._id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getSkills, addSkill, updateSkill, deleteSkill, setLoading, setError } = skillSlice.actions;
export default skillSlice.reducer;