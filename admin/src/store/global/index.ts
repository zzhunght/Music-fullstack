import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
    loading: boolean;
}

const initialState: GlobalState = {
    loading: false,
};

const GolbalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { startLoading, stopLoading } = GolbalSlice.actions;

export default GolbalSlice.reducer;
