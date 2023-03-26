import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllLabsState, Lab } from "../types";

const initialState: AllLabsState = {
    labs: [],
    loading: false,
    error: false,
    lastOrder: -1
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

export const updateLabs = createAsyncThunk<
    Lab[],
    number,
    { rejectValue: string }
>("labs/updateLabs", async function (order, { rejectWithValue }) {
    const url = (
        'http://localhost:3002/journals/640706a3b83da219ae6af40a/labs?' +
        new URLSearchParams({ order: String(order) }).toString()
    );
    const response = await fetch(url);

    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }

    const data = await response.json();
    return data;
});

const labSlice = createSlice({
    name: "labs",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabs.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchLabs.fulfilled, (state, action) => {
                state.labs = action.payload
                state.loading = false
                state.lastOrder = Math.max(...action.payload.map(elem => elem.order))
            })
            .addCase(fetchLabs.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(updateLabs.fulfilled, (state, action) => {
                let lastOrder = state.lastOrder
                action.payload.forEach(elem => {
                    if (elem.order > lastOrder) lastOrder = elem.order
                    const labIndex = state.labs.findIndex(e => e._id === elem._id)
                    if (labIndex !== -1) {
                        state.labs[labIndex] = elem
                    }
                    else {
                        state.labs.push(elem)
                    }
                })
                state.lastOrder = Math.max(...action.payload.map(elem => elem.order))
            })
    }
});

// eslint-disable-next-line no-empty-pattern
export const { } = labSlice.actions;

export default labSlice.reducer;
