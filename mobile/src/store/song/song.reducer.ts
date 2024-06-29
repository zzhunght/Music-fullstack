import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Song } from '../../interface/song'

export interface SongState {
    selectedSong: Song | undefined
    queue: Song[]
    songBackground: any
    isPlay: boolean
}


const initialState: SongState = {
    selectedSong: undefined,
    songBackground: null,
    isPlay: false,
    queue: []
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
        },
        setIsPlay: (state,action: PayloadAction<boolean>)=>{
            state.isPlay = action.payload
        },
        newQueue: (state,action: PayloadAction<Song[]>)=>{
            state.queue = action.payload
        },
        queueTrackChange: (state,action: PayloadAction<number>)=>{
            const track = state.queue.find(song => song.id === action.payload)
            if (track) {
                state.selectedSong = track
            }
        },
        addToQueue: (state,action: PayloadAction<Song>)=>{
            state.queue.push(action.payload)
        }
    },

})

export const { selectSong, loadSongBg, setIsPlay, newQueue, addToQueue, queueTrackChange } = songSlice.actions

export default songSlice.reducer