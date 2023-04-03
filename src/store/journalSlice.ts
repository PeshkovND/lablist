import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JournalState, Journal, JournalLab } from "../types";

const initialState: JournalState = {
  journal: null,
  loading: false,
  error: false,
  lastDeadline: undefined,
};

export const fetchJournal = createAsyncThunk<
  Journal,
  string,
  { rejectValue: string }
>("journals/fetchJournal", async function (id, { rejectWithValue }) {

  const response = await fetch("http://localhost:3002/journals/" + id);

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
        state.lastDeadline = setLastDealineLab(action.payload.labs);

      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

const setLastDealineLab = (labs: JournalLab[]) => {
  let maxDeadline: JournalLab | undefined = undefined
  const today = new Date();
  const strData = today.toISOString()
  labs.forEach(e => {
    if (e.deadline) {
      if (e.deadline < strData) {
        maxDeadline = e
      }
    }
  })
  return maxDeadline
}

// eslint-disable-next-line no-empty-pattern
export const {} = journalSlice.actions;

export default journalSlice.reducer;
