import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: 'searchSlice',
    initialState:{
        searchText: ""
    },
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        }
    }
})


export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer