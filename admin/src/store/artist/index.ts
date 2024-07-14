import { Artist } from "@/interface/artist";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface InitialState {
    aritits: Artist[];
}
const initialState: InitialState = {
    aritits: [],
};

const ArtistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        loadArtist: (state, action: PayloadAction<Artist[]>) => {
            state.aritits = action.payload;
        },
        UpdateArtist: (state, action: PayloadAction<Artist>) => {
            const index = state.aritits.findIndex(
                (artist) => artist.id === action.payload.id
            );
            state.aritits[index] = action.payload;
            console.log(state.aritits);
        },
        NewArtist: (state, action: PayloadAction<Artist>) => {
            state.aritits.unshift(action.payload);
        },
        DeleteArtist: (state, action: PayloadAction<number>) => {
            const index = state.aritits.findIndex(
                (artist) => artist.id === action.payload
            );
            state.aritits.splice(index, 1);
        },
    },
});

export const { loadArtist, UpdateArtist, NewArtist, DeleteArtist } =
    ArtistSlice.actions;
export default ArtistSlice.reducer;
