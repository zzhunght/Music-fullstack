import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Song } from '@/interface/song';
import { AddSongToAlbum, Album, CreateAlbumParams, RemoveSongFromAlbum, UpdateAlbumParams } from "@/interface/album";

const albumApi = createApi({
    reducerPath: 'albumApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['album', 'album-song-not-in', 'album-detail', 'album-id'],
    endpoints: (builder) => ({
        getAlbum: builder.query<Album[], void>({
            query: () => ({ url: '/album/', method: 'get' }),
            providesTags: ['album'],
        }),
        createAlbum: builder.mutation<Album, CreateAlbumParams>({
            query: (body) => ({ url: '/album/', method: 'post', data: body }),
            invalidatesTags: ['album'],
        }),
        getAlbumSong: builder.query<Song[], number>({
            query: (id) => ({ url: '/album/song/' + id, method: 'get' }),
            providesTags: ['album-detail'],
        }),
        getSongNotInpAlbum: builder.query<Song[], number>({
            query: (id) => ({ url: '/album/song-not-in/' + id, method: 'get' }),
            providesTags: ['album-song-not-in'],
        }),
        updateAlbum: builder.mutation<Album, UpdateAlbumParams>({
            query: (body) => ({ url: '/album/' + body.id, method: 'put', data: body.body }),
            invalidatesTags: ['album'],
        }),
        addSongToAlbum: builder.mutation<boolean, AddSongToAlbum>({
            query: (body) => ({ url: '/album/song/add', method: 'post', data: body }),
            invalidatesTags: ['album-detail', 'album-song-not-in'],
        }),
        removeSongFromAlbum: builder.mutation<boolean, RemoveSongFromAlbum>({
            query: (body) => ({ url: '/album/song/remove', method: 'post', data: body }),
            invalidatesTags: ['album-detail', 'album-song-not-in'],
        }),
        deleteAlbum: builder.mutation<boolean, number>({
            query: (id) => ({ url: '/album/' + id, method: 'delete'}),
            invalidatesTags: ['album']
        }),
    }),
});

export const {
    useGetAlbumQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useAddSongToAlbumMutation,
    useRemoveSongFromAlbumMutation,
    useGetAlbumSongQuery,
    useGetSongNotInpAlbumQuery,
    useDeleteAlbumMutation
} = albumApi

export default albumApi
