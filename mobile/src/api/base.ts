import AsyncStorage from '@react-native-async-storage/async-storage'
import { createApi } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { STORAGE_KEY } from '../constants/asyncStorageKey'
const BASE_URL = 'http://192.168.2.192:8080/api/v1'


const instance = axios.create()

instance.interceptors.request.use(async function (config) {
    const access_token = await AsyncStorage.getItem(STORAGE_KEY.AccessToken)
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {
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
        const error = {
            status: err.response?.status,
            data: err.response?.data || err.message,
        }
        console.log("error:", error)
        return {
            error: error
        }
    }
}

