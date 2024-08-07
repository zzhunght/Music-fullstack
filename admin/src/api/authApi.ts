import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { ConfirmOTP, LoginBody, LoginResponse, RegisterBody, SendOTP, User } from '@/interface/user';
import { STORAGE_KEY } from '@/constants';

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
                localStorage.setItem(STORAGE_KEY.AccessToken, response.access_token)
                localStorage.setItem(STORAGE_KEY.RefreshToken, response.refresh_token)
                return response
            },
        }),
        signUp: builder.mutation<boolean, RegisterBody>({
            query: (body) => ({
                url: '/user/register',
                method: 'POST',
                data: body
            })
        }),
        confirmOTP: builder.mutation<boolean, ConfirmOTP>({
            query: (body) => ({
                url: '/user/verify-otp',
                method: 'POST',
                data: body
            })
        }),
        resendOTP: builder.mutation<boolean, SendOTP>({
            query: (body) => ({
                url: '/user/send-otp',
                method: 'POST',
                data: body
            })
        }),
        getUserInfo: builder.query<User, void>({
            query: (body) => ({
                url: '/user/info',
                method: 'GET',
                data: body
            })
        })
    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useConfirmOTPMutation,
    useResendOTPMutation,
    useGetUserInfoQuery
} = userApi

export default userApi
