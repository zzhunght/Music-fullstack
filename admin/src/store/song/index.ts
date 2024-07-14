import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Artist = {
    id: number;
    name: string;
    avatar_url: string;
};

export type Song = {
    id: number;
    name: string;
    thumbnail: string;
    path: string;
    artists: Artist[];
    category_id: number;
    // lyrics: string;
    duration: number;
    releaseDate: string;
};

interface InitialState {
    songs: Song[];
}
const initialState: InitialState = {
    songs: [],
};

const SongSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        loadSong: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload;
        },
        UpdateSong: (state, action: PayloadAction<Song>) => {
            const index = state.songs.findIndex(
                (song) => song.id === action.payload.id
            );
            state.songs[index] = action.payload;
            console.log(state.songs);
        },
        NewSong: (state, action: PayloadAction<Song>) => {
            state.songs.unshift(action.payload);
        },
        DeleteSong: (state, action: PayloadAction<number>) => {
            console.log("action payload", action.payload);
            const index = state.songs.findIndex(
                (song) => song.id === action.payload
            );
            state.songs.splice(index, 1);
        },
    },
});

export const { loadSong, UpdateSong, NewSong, DeleteSong } = SongSlice.actions;
export default SongSlice.reducer;
