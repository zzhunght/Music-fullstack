import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../interface";


interface RecentState {
    songs: Song[]
}


const initialState: RecentState = {
    songs: []
}


const recentSlice = createSlice({
    name: "recent",
    initialState,
    reducers: {
        loadRecent: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload
        },
        addRecent: (state, action: PayloadAction<Song>) => {
            state.songs.unshift(action.payload)
            if (state.songs.length > 10) {
                state.songs = state.songs.slice(0, 10);
            }
        }
    }

})

export const { loadRecent, addRecent } = recentSlice.actions
export default recentSlice.reducer