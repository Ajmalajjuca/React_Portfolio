import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    isLoading: false,
    error: null,
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        getProjects: (state, action) => {
            state.projects = action.payload;
            
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
            
        },
        updateProject: (state, action) => {
            state.projects = state.projects.map(project => project._id === action.payload._id ? action.payload : project);
            
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload);
            
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },


    }

})

export default projectSlice.reducer;
export const { getProjects, addProject, updateProject, deleteProject, setLoading, setError } = projectSlice.actions;