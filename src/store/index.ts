import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import labReducer from './labSlice'
import journalReducer from './journalSlice'
import historyReducer from './historySlice'
import filterReducer from './filterStore'
import allJournalsReducer from './allJournalSlice'
import messagesReducer from './messagesSlice'

export const store = configureStore({
    reducer: {
        labs: labReducer,
        users: userReducer,
        journal: journalReducer,
        history: historyReducer,
        filter: filterReducer,
        allJournals: allJournalsReducer,
        messages: messagesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
