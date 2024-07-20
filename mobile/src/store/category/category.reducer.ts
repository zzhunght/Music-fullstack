import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../interface/categories";


interface CategoryState {
    selected?: Category
}

const initState: CategoryState = {
    selected: undefined
}

const categorySlice = createSlice({
    name: "category",
    initialState: initState,
    reducers: {

        selectCategory(state, action: PayloadAction<Category>) {
            state.selected = action.payload
        }
    }
})
export const { selectCategory } = categorySlice.actions

export default categorySlice.reducer