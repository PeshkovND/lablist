import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllUsersState, User } from "../types";

const initialState: AllUsersState = {
  users: [],
  loading: false,
  error: false
};

export const fetchUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>("users/fetchUsers", async function (_, { rejectWithValue }) {

  const response = await fetch("http://localhost:3004/640706a3b83da219ae6af40a");

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

// eslint-disable-next-line no-empty-pattern
export const { } = userSlice.actions;

export default userSlice.reducer;
