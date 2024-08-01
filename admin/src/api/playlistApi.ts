import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { AddSongToPlaylist, CreatePlaylist, GetSongNotInPlaylistParams, Playlist, RemoveSongFromPlaylist, UpdatePlaylist } from '@/interface/playlist';
import { Song } from '@/interface/song';

const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['playlist', 'playlist-song-not', 'playlist-detail', 'playlist-id'],
    endpoints: (builder) => ({
        getPlaylist: builder.query<Playlist[], void>({
            query: () => ({ url: '/playlist/', method: 'get' }),
            providesTags: ['playlist'],
        }),
        searchPlaylist: builder.query<Playlist[], string>({
            query: (search) => ({ url: '/playlist/search?search' + search, method: 'get' }),
        }),
        getPlaylistById: builder.query<Playlist, number>({
            query: (id) => ({ url: '/playlist/' + id, method: 'get'}),
            providesTags: ['playlist-id'],
        }),
        getPlaylistDetail: builder.query<Song[], number>({
            query: (id) => ({ url: '/playlist/songs/' + id, method: 'get' }),
            providesTags: ['playlist-detail'],
        }),
        getSongNotInplaylist: builder.query<Song[], GetSongNotInPlaylistParams>({
            query: (param) => ({ url: '/playlist/song-not-in/' + param.id + '?search='+ param.search , method: 'get' }),
            providesTags: ['playlist-song-not'],
        }),
        createPlaylist: builder.mutation<Playlist, CreatePlaylist>({
            query: (body) => ({ url: '/playlist/', method: 'post', data: body }),
            invalidatesTags: ['playlist'],
        }),
        updatePlaylist: builder.mutation<Playlist, UpdatePlaylist>({
            query: (body) => ({ url: '/playlist/' + body.id, method: 'put', data: body.body }),
            invalidatesTags: ['playlist-id','playlist'],
        }),
        addSongToPlaylist: builder.mutation<Playlist, AddSongToPlaylist>({
            query: (body) => ({ url: '/playlist/add-song', method: 'post', data: body }),
            invalidatesTags: ['playlist-song-not', 'playlist-detail']
        }),
        removeSongFromPlaylist: builder.mutation<Playlist, RemoveSongFromPlaylist>({
            query: (body) => ({ url: '/playlist/remove-song', method: 'post', data: body }),
            invalidatesTags: ['playlist-song-not', 'playlist-detail']
        }),
        deletePlaylist: builder.mutation<boolean, number>({
            query: (id) => ({ url: '/playlist/admin-delete/' + id, method: 'delete'}),
            invalidatesTags: ['playlist']
        }),
    }),
});


export const {
    useGetPlaylistQuery,
    useCreatePlaylistMutation,
    useGetPlaylistDetailQuery,
    useGetSongNotInplaylistQuery,
    useAddSongToPlaylistMutation,
    useRemoveSongFromPlaylistMutation,
    useUpdatePlaylistMutation,
    useGetPlaylistByIdQuery,
    useSearchPlaylistQuery,
    useDeletePlaylistMutation
} = playlistApi

export default playlistApi
