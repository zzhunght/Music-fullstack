import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Album = {
    id: number;
    name: string;
    thumbnail: string;
    artistId: number;
    releaseDate: string;
};

interface InitialState {
    albums: Album[];
}
const initialState: InitialState = {
    albums: [],
};

const AlbumSlice = createSlice({
    name: "Album",
    initialState,
    reducers: {
        loadAlbum: (state, action: PayloadAction<Album[]>) => {
            state.albums = action.payload;
        },
        UpdateAlbum: (state, action: PayloadAction<Album>) => {
            const index = state.albums.findIndex(
                (album) => album.id === action.payload.id
            );
            state.albums[index] = action.payload;
            console.log(state.albums);
        },
        NewAlbum: (state, action: PayloadAction<Album>) => {
            state.albums.unshift(action.payload);
        },
        DeleteAlbum: (state, action: PayloadAction<number>) => {
            const index = state.albums.findIndex(
                (Album) => Album.id === action.payload
            );
            state.albums.splice(index, 1);
        },
    },
});

export const { loadAlbum, UpdateAlbum, NewAlbum, DeleteAlbum } =
    AlbumSlice.actions;
export default AlbumSlice.reducer;
