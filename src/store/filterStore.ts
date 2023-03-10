import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "../types";

const initialState: Filter = {
  studentFilter: undefined,
  labFilter: undefined
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    updateLabFilter(state, action: PayloadAction<number>) {
      if (state.labFilter === action.payload) {
        state.labFilter = undefined
      }
      else {
        state.labFilter = action.payload
        state.studentFilter = undefined
      }
    },
    updateStudentFilter(state, action: PayloadAction<string>) {
      if (state.studentFilter === action.payload) {
        state.studentFilter = undefined
      }
      else {
        state.studentFilter = action.payload
        state.labFilter = undefined
      }
    }
  },
});

// eslint-disable-next-line no-empty-pattern
export const { updateLabFilter, updateStudentFilter } = filterSlice.actions;

export default filterSlice.reducer;
