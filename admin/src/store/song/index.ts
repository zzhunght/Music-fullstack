import { Song } from "@/interface/song";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Artist = {
    id: number;
    name: string;
    avatar_url: string;
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
