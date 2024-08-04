import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { ConfirmOTP, LoginBody, LoginResponse, NameChangeParam, PasswordChangeParam, RegisterBody, SendOTP, User } from '../interface/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../constants/asyncStorageKey';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['info'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginBody>({
            query: (body) => ({
                url: '/user/login',
                method: 'POST',
                data: body
            }),
            
            transformResponse: (response: LoginResponse) => {
                AsyncStorage.setItem(STORAGE_KEY.AccessToken, response.access_token)
                AsyncStorage.setItem(STORAGE_KEY.RefreshToken, response.refresh_token)
                return response
            },
            invalidatesTags: ['info'],
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
            }),
            providesTags: ['info']
        }),
        changePassword: builder.mutation<boolean, PasswordChangeParam>({
            query: (body) => ({
                url: '/user/change-password',
                method: 'POST',
                data: body
            })
        }),
        changeName: builder.mutation<boolean, NameChangeParam>({
            query: (body) => ({
                url: '/user/update-name',
                method: 'POST',
                data: body
            }),
            invalidatesTags: ['info']
        }),
        forgetPassword: builder.mutation<boolean, string>({
            query: (email) => ({
                url: '/user/forget-password?email=' + email,
                method: 'POST',
            })
        }),
        logout: builder.mutation<boolean, void>({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
            }),
            transformResponse: (response: boolean) => {
                console.log("response: ", response)
                return response
            },
            invalidatesTags: ['info']
        })
    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useConfirmOTPMutation,
    useResendOTPMutation,
    useGetUserInfoQuery,
    useChangePasswordMutation,
    useForgetPasswordMutation,
    useLogoutMutation,
    useChangeNameMutation
} = userApi

export default userApi
