import { configureStore } from '@reduxjs/toolkit'
import songReducer from './song/song.reducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import songApi from '../api/song'
import artistApi from '../api/artist'
import albumApi from '../api/album'
import playListApi from '../api/playlist'
import userApi from '../api/user'
import favoriteApi from '../api/favorite'
import searchReducer from './search/search.reducer'
import categoriesApi from '../api/categories'
import categoryReducer from './category/category.reducer'

export const store = configureStore({
  reducer: {
    [songApi.reducerPath]: songApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [albumApi.reducerPath]: albumApi.reducer,
    [playListApi.reducerPath]: playListApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    songSlice: songReducer,
    categorySlice: categoryReducer,
    searchSlice: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      songApi.middleware, 
      artistApi.middleware,
      albumApi.middleware,
      playListApi.middleware,
      userApi.middleware,
      favoriteApi.middleware,
      categoriesApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)