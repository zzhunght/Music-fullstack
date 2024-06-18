import { createSlice } from '@reduxjs/toolkit'

export interface SongState {
}

const initialState: SongState = {
}

export const songSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        
    },
})

export const { } = songSlice.actions

export default songSlice.reducer