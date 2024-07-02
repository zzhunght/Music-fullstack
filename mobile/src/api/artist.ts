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
        
    }),
});

export const {
    useGetRecommentArtistQuery
} = artistApi

export default artistApi
