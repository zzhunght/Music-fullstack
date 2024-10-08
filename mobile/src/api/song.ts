import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { ArtistSong, Song } from '../interface';

const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getNewSong: builder.query<Song[], void>({
            query: () => ({ url: '/song/new-song', method: 'get' }),
        }),
        searchSong: builder.query<Song[], string>({
            query: (search) => ({ url: '/song/search/' + search, method: 'get' }),
        }),
        getSongByArtist: builder.query<ArtistSong, number>({
            query: (artist_id) => ({ url: '/artist/song/' + artist_id, method: 'get' }),
        }),
        increaseViewCount: builder.mutation<boolean, number>({
            query: (id) => ({
                url: '/song/play/' + id,
                method: 'post',
            })
        })
    }),
});

export const {
    useGetNewSongQuery,
    useGetSongByArtistQuery,
    useSearchSongQuery,
    useIncreaseViewCountMutation,
} = songApi

export default songApi
