// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import songReducer from './song/song.reducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import songApi from '../api/song';
import artistApi from '../api/artist';
import albumApi from '../api/album';
import playListApi from '../api/playlist';
import userApi from '../api/user';
import favoriteApi from '../api/favorite';
import searchReducer from './search/search.reducer';
import categoriesApi from '../api/categories';
import categoryReducer from './category/category.reducer';
import albumReducer from './album/album.reducer';
import commentApi from '../api/comment';
import recentReducer from './recent/recent.reducer';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['songSlice','recentSlice']
};

const rootReducer = combineReducers({
  [songApi.reducerPath]: songApi.reducer,
  [artistApi.reducerPath]: artistApi.reducer,
  [albumApi.reducerPath]: albumApi.reducer,
  [playListApi.reducerPath]: playListApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  songSlice: songReducer,
  categorySlice: categoryReducer,
  searchSlice: searchReducer,
  albumSlice: albumReducer,
  recentSlice: recentReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      songApi.middleware,
      artistApi.middleware,
      albumApi.middleware,
      playListApi.middleware,
      userApi.middleware,
      favoriteApi.middleware,
      categoriesApi.middleware,
      commentApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export const purgePersistedState = async() => {
  await persistor.purge();
};