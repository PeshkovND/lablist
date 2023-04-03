import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Journal, AllJournalsState } from "../types";

const initialState: AllJournalsState = {
  journals: null,
  loading: false,
  error: false,
};

export const fetchAllJournals = createAsyncThunk<
  Journal[],
  string,
  { rejectValue: string }
>("allJournals/fetchAllJournals", async function (name, { rejectWithValue }) {

  const url = (
    'http://localhost:3002/journals?' +
    new URLSearchParams({ nameContains: name }).toString()
  );

  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

const allJournalsSlice = createSlice({
  name: "journals",
  initialState: initialState,
  reducers: {
    setJournalsLoading(state) {
      state.loading = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJournals.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchAllJournals.fulfilled, (state, action) => {
        state.journals = action.payload
        state.loading = false

      })
      .addCase(fetchAllJournals.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { setJournalsLoading } = allJournalsSlice.actions;

export default allJournalsSlice.reducer;
