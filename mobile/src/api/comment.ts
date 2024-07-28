import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base";
import { Comment, CreateCommentParams } from "../interface/comment";


const commentApi = createApi({
    reducerPath: 'commentAPI',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['comment'],
    endpoints: (builder) => ({
        getSongComments: builder.query<Comment[], number>({
            query: (song_id) => ({ url: '/comment/' + song_id, method: 'get' }),
            providesTags: ['comment'],
        }),
        createComment: builder.mutation<Comment, CreateCommentParams>({
            query: (body) => ({ url: '/comment/', method: 'post', data: body }),
            invalidatesTags: ['comment'],
        })
    }),
})

export const { useGetSongCommentsQuery, useCreateCommentMutation } = commentApi;
export default commentApi