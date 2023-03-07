import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllHistoryState, HistoryType } from "../types";

const initialState: AllHistoryState = {
  history: [],
  messages: [],
  loading: false,
  error: false
};

export const fetchHistory = createAsyncThunk<
  HistoryType[],
  undefined,
  { rejectValue: string }
>("history/fetchHistory", async function (_, { rejectWithValue }) {

  const response = await fetch("http://localhost:3003/640706a3b83da219ae6af40a/history");

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const fetchMessages = createAsyncThunk<
  HistoryType[],
  undefined,
  { rejectValue: string }
>("history/fetchMessages", async function (_, { rejectWithValue }) {

  const response = await fetch("http://localhost:3003/640706a3b83da219ae6af40a/messages");

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload
        state.loading = false
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.loading = false
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { } = historySlice.actions;

export default historySlice.reducer;
