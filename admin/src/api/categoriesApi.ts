
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { Category, CreateCategoryParams, UpdateCategoryParams } from "@/interface/categories";

const categoriesAPI = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['categoryAPI'],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({ url: '/categories/', method: 'get' }),
            providesTags: ['categoryAPI'],
        }),
        createCategory: builder.mutation<Category, CreateCategoryParams>({
            query: (body) => ({ url: '/categories/', method: 'POST', data: body }),
            invalidatesTags: ['categoryAPI'],
        }),
        updateCategory: builder.mutation<Category, UpdateCategoryParams>({
            query: (body) => ({ url: '/categories/', method: 'PUT', data: body }),
            invalidatesTags: ['categoryAPI'],
        }),
        deleteCategory: builder.mutation<boolean, number>({
            query: (id) => ({ url: '/categories/' + id, method: 'DELETE' }),
            invalidatesTags: ['categoryAPI'],
        })
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesAPI

export default categoriesAPI
