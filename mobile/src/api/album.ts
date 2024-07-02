import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Album} from '../interface';

const albumApi = createApi({
    reducerPath: 'a;bum',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getNewAlbum: builder.query<Album[], void>({
            query: () => ({ url: '/album/new', method: 'get' }),
        }),
        
    }),
});

export const {
    useGetNewAlbumQuery
} = albumApi

export default albumApi
