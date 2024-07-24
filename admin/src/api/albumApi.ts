import request from "../utils/request";

export interface AlbumParams {
    name: string;
    thumbnail: string;
    artistId: number; // Assuming Artist is also a type defined somewhere
    releaseDate: Date;
}

export const getAllAlbum = async () => {
    const res = await request.get("/admin/album");
    return res.data;
};

export const createAlbum = async ({
    name,
    thumbnail,
    artistId,
    releaseDate,
}: any) => {
    const res = await request.post("/admin/album", {
        name: name,
        thumbnail: thumbnail,
        artist_id: artistId,
        release_date: releaseDate,
    });

    return res.data;
};

export const updateAlbumById = async (
    albumId: number,
    { name, thumbnail, artistId, releaseDate }: any
) => {
    const res = await request.put(`/admin/album/${albumId}`, {
        name: name,
        thumbnail: thumbnail,
        artist_id: artistId,
        release_date: releaseDate,
    });

    return res.data;
};

export const deleteAlbumById = async (albumId: number) => {
    const res = await request.delete(`/admin/album/${albumId}`);
    return res.data;
};

export const getSongByAlbumId = async (albumId: number) => {
    const res = await request.get(`/admin/album/${albumId}`);
    return res.data;
};

export const getSongNotinByAlbumId = async (albumId: number) => {
    return await request
        .get(`/admin/album/${albumId}/song_not_in`)
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const addSongByAlbumId = async ({
    albumId,
    idSongs,
}: {
    albumId: number;
    idSongs: number[];
}) => {
    const res = await request.post("/admin/album/add-song", {
        album_id: albumId,
        song_ids: idSongs,
    });

    return res;
};

export const deleteSongByAlbumId = async (
    albumId: number,
    songIds: number[]
) => {
    const res = await request.post(`/admin/album/remove-song/${albumId}`, {
        ids: songIds,
    });
    return res.data;
};


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
    }),
});

export const {
    useGetAlbumQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useAddSongToAlbumMutation,
    useRemoveSongFromAlbumMutation,
    useGetAlbumSongQuery,
    useGetSongNotInpAlbumQuery
} = albumApi

export default albumApi
