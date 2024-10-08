import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base";
import { Artist, CreateArtistParams, UpdateArtistParams } from "@/interface/artist";

const artistAPI = createApi({
    reducerPath: 'artistAPI',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['artist'],
    endpoints: (builder) => ({
        getArtist: builder.query<Artist[], void>({
            query: () => ({ url: '/artist/all', method: 'get' }),
            providesTags: ['artist'],
        }),
        createArtist: builder.mutation<Artist, CreateArtistParams>({
            query: (body) => ({ url: '/artist/', method: 'POST', data: body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    artistAPI.util.updateQueryData('getArtist', undefined, draft => {
                        draft.unshift({ ...body, 
                            id: Math.floor(Math.random() * (100000) + 10000),
                            created_at: new Date().toLocaleDateString()
                        });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateArtist: builder.mutation<Artist, UpdateArtistParams>({
            query: (body) => ({ url: '/artist/' + body.id, method: 'PUT', data: body.body }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    artistAPI.util.updateQueryData('getArtist', undefined, draft => {
                        const index = draft.findIndex(artist => artist.id === body.id);
                        if (index !== -1) {
                            draft[index] = { ...draft[index], ...body.body };
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        deleteArtist: builder.mutation<boolean, number>({
            query: (id) => ({ url: '/artist/' + id, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    artistAPI.util.updateQueryData('getArtist', undefined, draft => {
                        return draft.filter(artist => artist.id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        })
    }),
});

export const {
    useCreateArtistMutation,
    useUpdateArtistMutation,
    useDeleteArtistMutation,
    useGetArtistQuery
} = artistAPI

export default artistAPI
