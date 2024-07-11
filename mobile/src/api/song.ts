import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { ArtistSong, Song } from '../interface';

const songApi = createApi({
    reducerPath: 'song',
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
    }),
});

export const {
    useGetNewSongQuery,
    useGetSongByArtistQuery,
    useSearchSongQuery
} = songApi

export default songApi
