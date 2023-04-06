import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllHistoryState, HistoryType, MessagesResponse } from "../types";

const dataLimit = 15;
// let messageDataOffset = 0;
// let historyDataOffset = 0;

const initialState: AllHistoryState = {
  history: [],
  messages: [],
  historyLoading: false,
  messagesLoading: false,
  error: false,
  historyUpdating: false,
  messagesUpdating: false,
  historyCount: 0,
  messagesCount: 0,
  historyCursor: null,
  messagesCursor: null,
  historyPaggingError: false,
  messagesPaggingError: false,
};

export const fetchHistory = createAsyncThunk<
  MessagesResponse,
  string,
  { rejectValue: string }
>("history/fetchHistory", async function (id, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/' + id + '/history?' +
    new URLSearchParams({ limit: String(dataLimit) }).toString()
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
    new URLSearchParams({ limit: String(dataLimit) }).toString()
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
  [string, string],
  { rejectValue: string }
>("history/updateHistory", async function ([cursor, id], { rejectWithValue }) {
  const url: string = (
    'http://localhost:3003/' + id + '/history?' +
    new URLSearchParams({ cursor: String(cursor), limit: String(dataLimit) }).toString()
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
  [string, string],
  { rejectValue: string }
>("history/updateMessages", async function ([cursor, id], { rejectWithValue }) {
  const url = (
    'http://localhost:3003/' + id + '/messages?' +
    new URLSearchParams({ cursor: String(cursor), limit: String(dataLimit) }).toString()
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
      }
      else {
        state.messages = [action.payload, ...state.messages]
        state.messagesCount += 1
      }
    },
    dropMessages(state) {
      state.history = []
      state.messages = []
      state.historyLoading = false
      state.messagesUpdating = false
      state.error = false
      state.historyCount = 0
      state.messagesCount = 0
      state.historyUpdating = false
      state.messagesUpdating = false
      state.historyCursor = null
      state.messagesCursor = null
      state.historyPaggingError = false
      state.messagesPaggingError = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.historyLoading = true
        state.error = false
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload.data
        state.historyCount = action.payload.count
        state.historyLoading = false
        state.historyCursor = action.payload.afterCursor
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.historyLoading = false
        state.error = true
      })
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true
        state.error = false
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.data
        state.messagesCount = action.payload.count
        state.messagesLoading = false
        state.messagesCursor = action.payload.afterCursor
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoading = false
        state.error = true
      })
      .addCase(paggingUpdateHistory.pending, (state) => {
        state.historyUpdating = true
        state.historyPaggingError = false
      })
      .addCase(paggingUpdateHistory.fulfilled, (state, action) => {
        state.history = [...state.history, ...action.payload.data]
        state.historyUpdating = false
        state.historyCursor = action.payload.afterCursor
      })
      .addCase(paggingUpdateHistory.rejected, (state, action) => {
        state.historyUpdating = false
        state.historyPaggingError = true
      })
      .addCase(paggingUpdateMessages.pending, (state) => {
        state.messagesUpdating = true
        state.messagesPaggingError = false
      })
      .addCase(paggingUpdateMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.messagesUpdating = false
        state.messagesCursor = action.payload.afterCursor
      })
      .addCase(paggingUpdateMessages.rejected, (state, action) => {
        state.messagesUpdating = false
        state.messagesPaggingError = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { updateMessages, dropMessages } = historySlice.actions;

export default historySlice.reducer;
