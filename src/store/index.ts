import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import labReducer from './labSlice'
import journalReducer from './journalSlice'

export const store = configureStore({
    reducer: {
        labs: labReducer,
        users: userReducer,
        journal: journalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
