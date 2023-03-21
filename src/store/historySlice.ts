import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllHistoryState, MessagesResponse } from "../types";

const dataLimit = 15;

const initialState: AllHistoryState = {
  history: [],
  messages: [],
  loading: false,
  error: false,
  historyCount: 0,
  messagesCount: 0,
  updating: false
};

export const fetchHistory = createAsyncThunk<
  MessagesResponse,
  undefined,
  { rejectValue: string }
>("history/fetchHistory", async function (_, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/history?' +
    new URLSearchParams({ offset: "0", limit: String(dataLimit) }).toString()
  );

  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const fetchMessages = createAsyncThunk<
  MessagesResponse,
  undefined,
  { rejectValue: string }
>("history/fetchMessages", async function (_, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/messages?' +
    new URLSearchParams({ offset: "0", limit: String(dataLimit) }).toString()
  );
  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const updateHistory = createAsyncThunk<
  MessagesResponse,
  number,
  { rejectValue: string }
>("history/updateHistory", async function (offset, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/history?' +
    new URLSearchParams({ offset: String(offset), limit: String(dataLimit) }).toString()
  );
  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const updateMessages = createAsyncThunk<
  MessagesResponse,
  number,
  { rejectValue: string }
>("history/updateMessages", async function (offset, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/messages?' +
    new URLSearchParams({ offset: String(offset), limit: String(dataLimit) }).toString()
  );
  const response = await fetch(url);

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
        state.history = action.payload.data
        state.historyCount = action.payload.count
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
        state.messages = action.payload.data
        state.messagesCount = action.payload.count
        state.loading = false
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(updateHistory.pending, (state) => {
        state.updating = true
        state.error = false
      })
      .addCase(updateHistory.fulfilled, (state, action) => {
        state.history = [...state.history, ...action.payload.data]
        state.updating = false
      })
      .addCase(updateHistory.rejected, (state, action) => {
        state.updating = false
        state.error = true
      })
      .addCase(updateMessages.pending, (state) => {
        state.updating = true
        state.error = false
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.updating = false
      })
      .addCase(updateMessages.rejected, (state, action) => {
        state.updating = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { } = historySlice.actions;

export default historySlice.reducer;
