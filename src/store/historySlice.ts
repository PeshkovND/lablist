import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllHistoryState, HistoryType, MessagesResponse } from "../types";

const dataLimit = 15;
let messageDataOffset = 0;
let historyDataOffset = 0;

const initialState: AllHistoryState = {
  history: [],
  messages: [],
  loading: false,
  error: false,
  historyCount: 0,
  messagesCount: 0,
  historyUpdating: false,
  messagesUpdating: false,
};

export const fetchHistory = createAsyncThunk<
  MessagesResponse,
  string,
  { rejectValue: string }
>("history/fetchHistory", async function (id, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/' + id + '/history?' +
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
  string,
  { rejectValue: string }
>("history/fetchMessages", async function (id, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/' + id + '/messages?' +
    new URLSearchParams({ offset: "0", limit: String(dataLimit) }).toString()
  );
  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const paggingUpdateHistory = createAsyncThunk<
  MessagesResponse,
  [number, string],
  { rejectValue: string }
>("history/updateHistory", async function ([step, id], { rejectWithValue }) {
  historyDataOffset += step
  const url: string = (
    'http://localhost:3003/' + id + '/history?' +
    new URLSearchParams({ offset: String(historyDataOffset), limit: String(dataLimit) }).toString()
  );
  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

export const paggingUpdateMessages = createAsyncThunk<
  MessagesResponse,
  [number, string],
  { rejectValue: string }
>("history/updateMessages", async function ([step, id], { rejectWithValue }) {
  messageDataOffset += step
  const url = (
    'http://localhost:3003/' + id + '/messages?' +
    new URLSearchParams({ offset: String(messageDataOffset), limit: String(dataLimit) }).toString()
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
  reducers: {
    updateMessages(state, action: PayloadAction<HistoryType>) {
      if (action.payload.status) {
        state.history = [action.payload, ...state.history]
        state.historyCount += 1
        historyDataOffset += 1
      }
      else {
        state.messages = [action.payload, ...state.messages]
        state.messagesCount += 1
        messageDataOffset += 1
      }
    },
  },
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
      .addCase(paggingUpdateHistory.pending, (state) => {
        state.historyUpdating = true
        state.error = false
      })
      .addCase(paggingUpdateHistory.fulfilled, (state, action) => {
        state.history = [...state.history, ...action.payload.data]
        state.historyUpdating = false
      })
      .addCase(paggingUpdateHistory.rejected, (state, action) => {
        state.historyUpdating = false
        state.error = true
      })
      .addCase(paggingUpdateMessages.pending, (state) => {
        state.messagesUpdating = true
        state.error = false
      })
      .addCase(paggingUpdateMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.messagesUpdating = false
      })
      .addCase(paggingUpdateMessages.rejected, (state, action) => {
        state.messagesUpdating = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { updateMessages } = historySlice.actions;

export default historySlice.reducer;
