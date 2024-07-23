import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../interface";


interface AlbumState  {
    selected?: Album
}


const initialState: AlbumState = {
    selected: undefined
}

const albumSlice = createSlice({

    name:'album',
    initialState: initialState,
    reducers: {
        selectAlbum(state, action: PayloadAction<Album>) {
            state.selected = action.payload
        }
    }
})


export const { selectAlbum } = albumSlice.actions
export default albumSlice.reducer