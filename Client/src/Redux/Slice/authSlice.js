import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setIsAuthenticated, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
