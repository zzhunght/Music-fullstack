import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Album, Song} from '../interface';

const albumApi = createApi({
    reducerPath: 'albumApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getNewAlbum: builder.query<Album[], void>({
            query: () => ({ url: '/album/new', method: 'get' }),
        }),
        getAlbumOfArtist: builder.query<Album[], number>({
            query: (artist_id) => ({ url: '/artist/album/' + artist_id, method: 'get' }),
        }),
        getAlbumSongs: builder.query<Song[], number >({
            query: (id) => ({ url: '/album/song/' + id, method: 'get' }),
        }),
    }),
});

export const {
    useGetNewAlbumQuery,
    useGetAlbumOfArtistQuery,
    useGetAlbumSongsQuery,
} = albumApi

export default albumApi
