import { configureStore } from "@reduxjs/toolkit";

import GlobalSlice from "./global/index";
import ArtistSlice from "./artist/index";
import SongSlice from "./song/index";
import AlbumSlice from "./album/index";
import AuthSlice from "./auth/index";


import CategoriesSlice from "./categories/index";
import songApi from "@/api/songApi";
import categoriesAPI from "@/api/categoriesApi";
import artistAPI from "@/api/artistApi";
import playlistApi from "@/api/playlistApi";
import userApi from "@/api/authApi";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: AuthSlice,
            global: GlobalSlice,
            artist: ArtistSlice,
            song: SongSlice,
            album: AlbumSlice,
            categories: CategoriesSlice,
            [songApi.reducerPath]: songApi.reducer,
            [categoriesAPI.reducerPath]: categoriesAPI.reducer,
            [artistAPI.reducerPath]: artistAPI.reducer,
            [playlistApi.reducerPath]: playlistApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                songApi.middleware, 
                categoriesAPI.middleware,
                artistAPI.middleware,
                playlistApi.middleware,
                userApi.middleware
            );
        }
    }
 )
}
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
