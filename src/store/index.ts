import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import labReducer from './labSlice'
import journalReducer from './journalSlice'
import historyReducer from './historySlice'
import filterStore from './filterStore'

export const store = configureStore({
    reducer: {
        labs: labReducer,
        users: userReducer,
        journal: journalReducer,
        history: historyReducer,
        filter: filterStore
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
