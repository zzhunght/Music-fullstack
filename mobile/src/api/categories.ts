
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Category } from '../interface/categories';
import { Song } from '../interface';

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['categoryAPI'],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({ url: '/categories/', method: 'get' }),
            providesTags: ['categoryAPI'],
        }),
        getSongInCategory: builder.query<Song[], number>({
            query: (id) => ({ url: '/categories/song/' + id, method: 'get' }),
            providesTags: ['categoryAPI'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSongInCategoryQuery
} = categoriesApi

export default categoriesApi
