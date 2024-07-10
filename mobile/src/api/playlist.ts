import { AddSongToPlaylist, CreatePlaylistResponse, RemoveSongToPlaylist } from './../interface/playlist';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { CreatePlaylist, Playlist, Song, UserPlaylist} from '../interface';

const playListApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['UserPlaylist'],
    endpoints: (builder) => ({
        getNewPlaylist: builder.query<Playlist[], void>({
            query: () => ({ url: '/playlist/new', method: 'get' }),
        }),
        getUserPlaylist: builder.query<UserPlaylist[], void>({
            query: () => ({ url: '/playlist/user', method: 'get' }),
            providesTags: ['UserPlaylist'],
        }), 
        getPlaylistSongs: builder.query<Song[], number>({
            query: (playlist_id) => ({ url: '/playlist/songs/' + playlist_id, method: 'get' }),
        }),
        createPlaylist: builder.mutation<CreatePlaylistResponse, CreatePlaylist>({
            query: (body) => ({ url: '/playlist/user', method: 'post', data: body }),
            invalidatesTags: ['UserPlaylist'],
        }),
        getPlaylist: builder.query<Playlist, number>({
            query: (playlist_id) => ({ url: '/playlist/' + playlist_id, method: 'get' }),
        }),
        addSongToPlaylist: builder.mutation<Song, AddSongToPlaylist>({
            query: (body) => ({
                url: '/playlist/add-song',
                method: 'POST',
                data: body
            })
        }),
        removeSongToPlaylist: builder.mutation<boolean, RemoveSongToPlaylist>({
            query: (body) => ({
                url: '/playlist/remove-song',
                method: 'POST',
                data: body
            })
        })
    }),
});

export const {
    useGetNewPlaylistQuery,
    useGetPlaylistSongsQuery,
    useGetPlaylistQuery,
    useGetUserPlaylistQuery,
    useAddSongToPlaylistMutation,
    useRemoveSongToPlaylistMutation,
    useCreatePlaylistMutation
} = playListApi

export default playListApi
