import { Song } from '@/interface/song'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface SongState {
    selectedSong: Song | undefined
    songBackground: any
}


const initialState: SongState = {
    selectedSong: undefined,
    songBackground: null
}

export const songSlice = createSlice({
    name: 'songSlice',
    initialState,
    reducers: {
        selectSong: (state,action: PayloadAction<Song>)=>{
            state.selectedSong = action.payload
        },
        loadSongBg: (state,action: PayloadAction<any>)=>{
            state.songBackground = action.payload
        }
    },

})

export const { selectSong, loadSongBg } = songSlice.actions

export default songSlice.reducer