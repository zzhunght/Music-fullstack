import request from "../utils/request";

export interface SongParams {
    name: string;
    thumbnail: string;
    path: string;
    categoryId: number; // Assuming Artist is also a type defined somewhere
    artistId: number; // Assuming Artist is also a type defined somewhere
    duration: string;
    // lyrics: string;
    releaseDate: Date;
}

export const getAllSong = async () => {
    return await request
        .get("/admin/song")
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const createSong = async ({
    name,
    thumbnail,
    path,
    artistId,
    categoryId,
    duration,
    // lyrics,
    releaseDate,
}: SongParams) => {
    return await request
        .post("/admin/song", {
            name,
            thumbnail,
            path,
            artist_id: Number(artistId),
            category_id: Number(categoryId),
            duration: Number(duration),
            // lyrics: null,
            release_date: releaseDate,
        })
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const deleteSongById = async (songId: number) => {
    return await request
        .delete(`/admin/song/${songId}`)
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const updateSongById = async (
    songId: number,
    {
        name,
        thumbnail,
        path,
        artistId,
        categoryId,
        duration,
        // lyrics,
        releaseDate,
    }: SongParams
) => {
    return await request
        .put(`/admin/song/${songId}`, {
            name,
            thumbnail,
            path,
            artist_id: Number(artistId),
            category_id: Number(categoryId),
            duration: Number(duration),
            // lyrics,
            release_date: releaseDate,
        })
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Song } from "@/store/song";

const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getSong: builder.query<Song[], void>({
            query: () => ({ url: '/song/all', method: 'get' }),
        }),

    }),
});

export const {
    useGetSongQuery
} = songApi

export default songApi
