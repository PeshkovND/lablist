import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllLabsState, Lab } from "../types";

const initialState: AllLabsState = {
    labs: [],
    loading: false,
    error: false,
};

export const fetchLabs = createAsyncThunk<
    Lab[],
    string,
    { rejectValue: string }
>("labs/fetchLabs", async function (id, { rejectWithValue }) {

    const response = await fetch("http://localhost:3002/journals/" + id + "/labs");

    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }

    const data = await response.json();
    return data;
});

const labSlice = createSlice({
    name: "labs",
    initialState: initialState,
    reducers: {
        updateLab(state, action: PayloadAction<Lab>) {
            state.labs = state.labs.map(elem => elem._id === action.payload._id ? action.payload : elem);
        },
        addLab(state, action: PayloadAction<Lab>) {
            state.labs = [...state.labs, action.payload]
        },
        dropLabs(state) {
            state.labs = []
            state.loading = false
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabs.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchLabs.fulfilled, (state, action) => {
                state.labs = action.payload
                state.loading = false
            })
            .addCase(fetchLabs.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    }
});

// eslint-disable-next-line no-empty-pattern
export const { updateLab, addLab, dropLabs } = labSlice.actions;

export default labSlice.reducer;
