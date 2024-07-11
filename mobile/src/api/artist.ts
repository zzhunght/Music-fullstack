import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Artist} from '../interface';

const artistApi = createApi({
    reducerPath: 'artist',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getRecommentArtist: builder.query<Artist[], void>({
            query: () => ({ url: '/artist/recommendations', method: 'get' }),
        }),
        searchArtist: builder.query<Artist[], string>({
            query: (search) => ({ url: '/artist/search/' + search, method: 'get' }),
        }),
    }),
});

export const {
    useGetRecommentArtistQuery,
    useSearchArtistQuery
} = artistApi

export default artistApi
