import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../Slice/pojectSlice'
import skillSlice from '../Slice/skillSlice'
import profileSlice from '../Slice/profileSlice'
import authSlice from '../Slice/authSlice'

const store = configureStore({
    reducer: {
        project: projectSlice,
        skill: skillSlice,
        profile: profileSlice,
        auth: authSlice
    }
})

export default store;