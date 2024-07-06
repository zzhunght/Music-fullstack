import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { LoginBody, LoginResponse } from '../interface/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../constants/asyncStorageKey';

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginBody>({
            query: (body) => ({
                url: '/user/login',
                method: 'POST',
                data: body
            }),
            transformResponse: (response:  LoginResponse ) => {
                AsyncStorage.setItem(STORAGE_KEY.AccessToken, response.access_token)
                AsyncStorage.setItem(STORAGE_KEY.RefreshToken, response.refresh_token)
                return response
            },
        })
    }),
});

export const {
    useLoginMutation
} = userApi

export default userApi
