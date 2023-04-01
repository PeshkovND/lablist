import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllLabsState, Lab } from "../types";

const initialState: AllLabsState = {
    labs: [],
    loading: false,
    error: false,
};

export const fetchLabs = createAsyncThunk<
    Lab[],
    undefined,
    { rejectValue: string }
>("labs/fetchLabs", async function (_, { rejectWithValue }) {

    const response = await fetch("http://localhost:3002/journals/640706a3b83da219ae6af40a/labs");

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
export const { updateLab, addLab } = labSlice.actions;

export default labSlice.reducer;
