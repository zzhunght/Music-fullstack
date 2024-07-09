import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import {  Song} from '../interface';

const favoriteApi = createApi({
    reducerPath: 'favorite',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getFavoriteSongs: builder.query<Song[], void>({
            query: () => ({ url: '/favorite/songs', method: 'get' }),
        }),
        checkFavoriteSong: builder.query<boolean, number>({
            query: (id) => ({
                url: `/favorite/check/${id}`,
                method: 'post',
            })
        }),
        favoriteSong: builder.mutation<boolean, number>({
            query: (id) => ({
                url: `/favorite/add/${id}`,
                method: 'post',
            })
        }),
        unFavoriteSong: builder.mutation<boolean, number>({
            query: (id) => ({
                url: `/favorite/remove/${id}`,
                method: 'post',
            })
        }),
    }),
});

export const {
    useGetFavoriteSongsQuery,
    useCheckFavoriteSongQuery,
    useFavoriteSongMutation,
    useUnFavoriteSongMutation
} = favoriteApi

export default favoriteApi
