import { create } from 'zustand';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface InitialState {
    categories: Category[];
}
const initialState: InitialState = {
    categories: [],
};

const ArtistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        loadCategories: (state, action: PayloadAction<Category[]>) => {
            console.log("parsing category ", action)
            state.categories = action.payload;
        },
        UpdateCategories: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(
                (category) => category.id === action.payload.id
            );
            state.categories[index] = action.payload;
            console.log(state.categories);
        },
        NewCategories: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        DeleteCategories: (state, action: PayloadAction<number>) => {
            const index = state.categories.findIndex(
                (category) => category.id === action.payload
            );
            state.categories.splice(index, 1);
        },
    },
});

export const { loadCategories, UpdateCategories, NewCategories, DeleteCategories } =
    ArtistSlice.actions;
export default ArtistSlice.reducer;
