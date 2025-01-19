import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../Slice/pojectSlice'

const store = configureStore({
    reducer: {
        project: projectSlice,
    }
})

export default store;