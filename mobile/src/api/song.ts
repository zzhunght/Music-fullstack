import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Song } from '../interface/song';

const songApi = createApi({
    reducerPath: 'song',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getNewSong: builder.query<Song[], void>({
            query: () => ({ url: '/song/new-song', method: 'get' }),
        }),
        
    }),
});

export const {useGetNewSongQuery} = songApi

export default songApi
