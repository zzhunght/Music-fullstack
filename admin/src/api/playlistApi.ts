import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { AddSongToPlaylist, CreatePlaylist, Playlist, RemoveSongFromPlaylist } from '@/interface/playlist';
import { Song } from '@/interface/song';

const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['playlist', 'playlist-song-not', 'playlist-detail'],
    endpoints: (builder) => ({
        getPlaylist: builder.query<Playlist[], void>({
            query: () => ({ url: '/playlist/', method: 'get' }),
            providesTags: ['playlist'],
        }),
        getPlaylistDetail: builder.query<Song[], number>({
            query: (id) => ({ url: '/playlist/songs/' + id, method: 'get' }),
            providesTags: ['playlist-detail'],
        }),
        getSongNotInplaylist: builder.query<Song[], number>({
            query: (id) => ({ url: '/playlist/song-not-in/' + id, method: 'get' }),
            providesTags: ['playlist-song-not'],
        }),
        createPlaylist: builder.mutation<Playlist, CreatePlaylist>({
            query: (body) => ({ url: '/playlist/', method: 'post', data: body }),
            invalidatesTags: ['playlist'],
        }),
        addSongToPlaylist: builder.mutation<Playlist, AddSongToPlaylist>({
            query: (body) => ({ url: '/playlist/add-song', method: 'post', data: body }),
            invalidatesTags: ['playlist-song-not', 'playlist-detail']
        }),
        removeSongFromPlaylist: builder.mutation<Playlist, RemoveSongFromPlaylist>({
            query: (body) => ({ url: '/playlist/remove-song', method: 'post', data: body }),
            invalidatesTags: ['playlist-song-not', 'playlist-detail']
        }),
    }),
});

export const {
    useGetPlaylistQuery,
    useCreatePlaylistMutation,
    useGetPlaylistDetailQuery,
    useGetSongNotInplaylistQuery,
    useAddSongToPlaylistMutation,
    useRemoveSongFromPlaylistMutation
} = playlistApi

export default playlistApi
