import AsyncStorage from '@react-native-async-storage/async-storage'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { STORAGE_KEY } from '../constants/asyncStorageKey'
const BASE_URL = 'http://192.168.2.192:8080/api/v1'

export interface ErrorResponse {
    status?: number;
    data?: {
        error?: string;
    } | string;
}
const instance = axios.create()
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onRefreshed = () => {
    refreshSubscribers.map(callback => callback());
}

const addRefreshSubscriber = (callback: () => void) => {
    console.log("add subscriber")
    refreshSubscribers.push(callback);
}
 
// Function to handle token refresh
async function handleTokenRefresh(): Promise<string> {
    console.log("Token expired >>>>>>>>>>>>> handle refresh token")
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEY.RefreshToken);
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await instance.post<{ data: string }>(`${BASE_URL}/user/refresh-token`, {
        refresh_token: refreshToken
    });

    const newAccessToken = response?.data?.data;
    await AsyncStorage.setItem(STORAGE_KEY.AccessToken, newAccessToken);
    console.log("Refresh token successfully  >>>>>>>>>>> retry request");
    return newAccessToken;
}
instance.interceptors.request.use(async function (config) {
    console.log("URL : ", config.url)
    const access_token = await AsyncStorage.getItem(STORAGE_KEY.AccessToken)
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(async function (response) {
    return response;
}, async function (error) {

    const originalRequest = error.config;

    if (error?.response?.status === 401 && error?.response?.data?.error === 'token has expired') {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                await handleTokenRefresh();
                isRefreshing = false;
                onRefreshed();
                refreshSubscribers = [];
            } catch (refreshError) {
                isRefreshing = false;
                await AsyncStorage.removeItem(STORAGE_KEY.AccessToken);
                await AsyncStorage.removeItem(STORAGE_KEY.RefreshToken);
                return Promise.reject(refreshError);
            }
        }
 
        return Promise.resolve(addRefreshSubscriber(() => instance(originalRequest)))
    }
 
    return Promise.reject(error);
});
export const axiosBaseQuery = (): BaseQueryFn<
    {
        url: string
        method?: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params']
        headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
> => async ({ url, method, data, params, headers }) => {
    try {
        const result = await instance({
            url: BASE_URL + url,
            method,
            data,
            params,
            headers,
        })
        return { data: result.data.data }
    } catch (axiosError) {
        const err = axiosError as AxiosError
        const error: ErrorResponse = {
            status: err.response?.status,
            data: err.response?.data || err.message,
        }
        console.log("error: ", err)
        return {
            error: error
        }
    }
}

