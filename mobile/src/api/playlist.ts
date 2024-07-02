import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Playlist, Song} from '../interface';

const playListApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getNewPlaylist: builder.query<Playlist[], void>({
            query: () => ({ url: '/playlist/new', method: 'get' }),
        }),
        getPlaylistSongs: builder.query<Song[], number>({
            query: (playlist_id) => ({ url: '/playlist/songs/' + playlist_id, method: 'get' }),
        }),
        getPlaylist: builder.query<Playlist, number>({
            query: (playlist_id) => ({ url: '/playlist/' + playlist_id, method: 'get' }),
        }),
    }),
});

export const {
    useGetNewPlaylistQuery,
    useGetPlaylistSongsQuery,
    useGetPlaylistQuery
} = playListApi

export default playListApi
