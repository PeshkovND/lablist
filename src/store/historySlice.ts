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
  updating: false,
  historyLastOrder: -1,
  messagesLastOrder: -1,
};

export const fetchHistory = createAsyncThunk<
  MessagesResponse,
  undefined,
  { rejectValue: string }
>("history/fetchHistory", async function (_, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/history?' +
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
  undefined,
  { rejectValue: string }
>("history/fetchMessages", async function (_, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/messages?' +
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
  number,
  { rejectValue: string }
>("history/updateHistory", async function (lastElem, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/history?' +
    new URLSearchParams({ lessOrder: String(lastElem), limit: String(dataLimit) }).toString()
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
>("labs/updateHistory", async function (order, { rejectWithValue }) {
    const url = (
        'http://localhost:3003/640706a3b83da219ae6af40a/history?' +
        new URLSearchParams({ greatOrder: String(order) }).toString()
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
  number,
  { rejectValue: string }
>("history/updateMessages", async function (lastElem, { rejectWithValue }) {
  const url = (
    'http://localhost:3003/640706a3b83da219ae6af40a/messages?' +
    new URLSearchParams({ lessOrder: String(lastElem), limit: String(dataLimit) }).toString()
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
>("labs/updateMessages", async function (order, { rejectWithValue }) {
    const url = (
        'http://localhost:3003/640706a3b83da219ae6af40a/messages?' +
        new URLSearchParams({ greatOrder: String(order) }).toString()
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
        if (action.payload.data.length > 0) {
          state.history = action.payload.data
          state.historyCount = action.payload.count
          state.historyLastOrder = action.payload.order
        }
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
        state.messagesLastOrder = action.payload.order
        state.loading = false
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(paggingUpdateHistory.pending, (state) => {
        state.updating = true
        state.error = false
      })
      .addCase(paggingUpdateHistory.fulfilled, (state, action) => {
        state.history = [...state.history, ...action.payload.data]
        state.updating = false
      })
      .addCase(paggingUpdateHistory.rejected, (state, action) => {
        state.updating = false
        state.error = true
      })
      .addCase(paggingUpdateMessages.pending, (state) => {
        state.updating = true
        state.error = false
      })
      .addCase(paggingUpdateMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.updating = false
      })
      .addCase(paggingUpdateMessages.rejected, (state, action) => {
        state.updating = false
        state.error = true
      })
      .addCase(updateHistory.fulfilled, (state, action) => {
        if (action.payload.data.length > 0) {
          state.history = [...action.payload.data, ...state.history]
          state.historyLastOrder = action.payload.order
          state.historyCount = action.payload.count
        }
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        if (action.payload.data.length > 0) {
          state.messages = [...action.payload.data, ...state.messages]
          state.messagesLastOrder = action.payload.order
          state.messagesCount = action.payload.count
        }
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { } = historySlice.actions;

export default historySlice.reducer;
