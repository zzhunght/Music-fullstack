import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { CreateSong, Song, UpdateSong } from "@/interface/song";
const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['song'],
    endpoints: (builder) => ({
        getSong: builder.query<Song[], void>({
            query: () => ({ url: '/song/all', method: 'get' }),
            providesTags: ['song'],
        }),
        createSong: builder.mutation<Song[], CreateSong>({
            query: (body) => ({ url: '/song/', method: 'post', data: body }),
            invalidatesTags: ['song'],
        }),
        updateSong: builder.mutation<Song[], UpdateSong>({
            query: body => ({ url: '/song/' + body.id, data: body.body, method: 'put' }),
            invalidatesTags: ['song'],
        }),
        deleteSong: builder.mutation<Song[], number>({
            query: id => ({ url: '/song/' + id, method: 'delete' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    songApi.util.updateQueryData('getSong', undefined, draft => {
                        return draft.filter(song => song.id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            // invalidatesTags: ['song'],
        })
    }),
});

export const {
    useGetSongQuery,
    useUpdateSongMutation,
    useCreateSongMutation,
    useDeleteSongMutation
} = songApi

export default songApi
