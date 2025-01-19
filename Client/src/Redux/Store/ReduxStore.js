import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../Slice/pojectSlice'
import skillSlice from '../Slice/skillSlice'

const store = configureStore({
    reducer: {
        project: projectSlice,
        skill: skillSlice
    }
})

export default store;