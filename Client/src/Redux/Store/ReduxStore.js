import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../Slice/pojectSlice'
import skillSlice from '../Slice/skillSlice'
import profileSlice from '../Slice/profileSlice'

const store = configureStore({
    reducer: {
        project: projectSlice,
        skill: skillSlice,
        profile: profileSlice
    }
})

export default store;