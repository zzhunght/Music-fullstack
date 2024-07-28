import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Artist} from '../interface';

const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getRecommentArtist: builder.query<Artist[], void>({
            query: () => ({ url: '/artist/recommendations', method: 'get' }),
        }),
        getFollowingArtist: builder.query<Artist[], void>({
            query: () => ({ url: '/artist/followed', method: 'get' }),
        }),
        searchArtist: builder.query<Artist[], string>({
            query: (search) => ({ url: '/artist/search/' + search, method: 'get' }),
        }),
        followArtist: builder.mutation<boolean, number>({
            query: (artist_id) => ({ url: '/artist/follow/' + artist_id, method: 'post' }),
        }),
        unFollowArtist: builder.mutation<boolean, number>({
            query: (artist_id) => ({ url: '/artist/un-follow/' + artist_id, method: 'post' }),
        }),
        checkFollowArtist: builder.query<boolean, number>({
            query: (artist_id) => ({ url: '/artist/check-follow/' + artist_id, method: 'post' }),
        }),
    }),
});

export const {
    useGetRecommentArtistQuery,
    useGetFollowingArtistQuery,
    useSearchArtistQuery,
    useCheckFollowArtistQuery,
    useFollowArtistMutation,
    useUnFollowArtistMutation,
} = artistApi

export default artistApi
