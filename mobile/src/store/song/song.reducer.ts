import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Song } from '../../interface'

export interface SongState {
    selectedSong: Song | undefined
    queue: Song[]
    hasPlayed: Song[]
    songBackground: any
    isPlay: boolean
    isRepeat: boolean
    isShuffe: boolean,
}


const initialState: SongState = {
    selectedSong: undefined,
    hasPlayed: [],
    songBackground: null,
    isPlay: false,
    queue: [],
    isRepeat: false,
    isShuffe: false,
 
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
        setIsShuffe: (state,action: PayloadAction<boolean>)=>{
            state.isShuffe = action.payload
        },
        setIsRepeat: (state,action: PayloadAction<boolean>)=>{
            state.isRepeat = action.payload
        },
        addPlayedTrack: (state,action: PayloadAction<Song>)=>{
            state.hasPlayed.push(action.payload)
        },
        resetPlayedTrack: (state)=>{
            state.hasPlayed = []
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

export const { 
    resetPlayedTrack,
    addPlayedTrack,
    selectSong, 
    loadSongBg, 
    setIsPlay, 
    newQueue, 
    addToQueue, 
    queueTrackChange,
    setIsRepeat,
    setIsShuffe 
} = songSlice.actions

export default songSlice.reducer