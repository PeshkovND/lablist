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

export const fetchMessages = createAsyncThunk<
  MessagesResponse,
  string,
  { rejectValue: string }
>("messages/fetchMessages", async function (id, { rejectWithValue }) {
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

export const paggingUpdateMessages = createAsyncThunk<
  MessagesResponse,
  [string, string],
  { rejectValue: string }
>("messages/updateMessages", async function ([cursor, id], { rejectWithValue }) {
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

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    updateMessages(state, action: PayloadAction<HistoryType>) {
      if (!action.payload.status) {
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
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.data
        state.count = action.payload.count
        state.loading = false
        state.cursor = action.payload.afterCursor
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(paggingUpdateMessages.pending, (state) => {
        state.updating = true
        state.paggingError = false
      })
      .addCase(paggingUpdateMessages.fulfilled, (state, action) => {
        state.messages = [...state.messages, ...action.payload.data]
        state.updating = false
        state.cursor = action.payload.afterCursor
      })
      .addCase(paggingUpdateMessages.rejected, (state, action) => {
        state.updating = false
        state.paggingError = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { updateMessages, dropMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
