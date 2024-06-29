import { configureStore } from '@reduxjs/toolkit'
import songReducer from './song/song.reducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import songApi from '@/api/song'

export const store = configureStore({
  reducer: {
    [songApi.reducerPath]: songApi.reducer,
    songSlice: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(songApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)