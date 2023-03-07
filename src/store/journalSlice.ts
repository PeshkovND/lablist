import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JournalState, Journal } from "../types";

const initialState: JournalState = {
  journal: null,
  loading: false,
  error: false
};

export const fetchJournal = createAsyncThunk<
  Journal,
  undefined,
  { rejectValue: string }
>("journals/fetchJournal", async function (_, { rejectWithValue }) {

  const response = await fetch("http://localhost:3002/journals/640706a3b83da219ae6af40a");

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

const journalSlice = createSlice({
  name: "journals",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournal.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.journal = action.payload
        state.loading = false
      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { } = journalSlice.actions;

export default journalSlice.reducer;
