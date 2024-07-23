import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';
import { ConfirmOTP, LoginBody, LoginResponse, PasswordChangeParam, RegisterBody, SendOTP, User } from '../interface/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../constants/asyncStorageKey';
import playListApi from './playlist';
import favoriteApi from './favorite';
import artistApi from './artist';

const userApi = createApi({
    reducerPath: 'user',
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
            invalidatesTags: ['info'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.util.resetApiState());
                    dispatch(playListApi.util.resetApiState())
                    dispatch(favoriteApi.util.resetApiState())
                    dispatch(artistApi.util.resetApiState())
                    console.log("Logout successful clean up");
                } catch (error) {

                }
            }
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
    useLogoutMutation
} = userApi

export default userApi
