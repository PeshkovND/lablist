import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllHistoryState, HistoryType, MessagesResponse } from "../types";

const dataLimit = 15;
// let messageDataOffset = 0;
// let historyDataOffset = 0;

const initialState: AllHistoryState = {
  messages: [],
  loading: false,
  error: false,
  updating: false,
  count: 0,
  cursor: null,
  paggingError: false,
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

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    updateMessages(state, action: PayloadAction<HistoryType>) {
      if (action.payload.status) {
        state.messages = [action.payload, ...state.messages]
        state.count += 1
      }
    },
    dropMessages(state) {
      state.messages = []
      state.loading = false
      state.updating = false
      state.error = false
      state.count = 0
      state.cursor = null
      state.paggingError = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.messages = action.payload.data
        state.count = action.payload.count
        state.loading = false
        state.cursor = action.payload.afterCursor
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(paggingUpdateHistory.pending, (state) => {
        state.updating = true
        state.paggingError = false
      })
      .addCase(paggingUpdateHistory.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.updating = false
        state.cursor = action.payload.afterCursor
      })
      .addCase(paggingUpdateHistory.rejected, (state, action) => {
        state.updating = false
        state.paggingError = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { updateMessages, dropMessages } = historySlice.actions;

export default historySlice.reducer;
