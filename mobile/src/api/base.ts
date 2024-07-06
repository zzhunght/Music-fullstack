import { createApi } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
const BASE_URL = 'http://192.168.2.195:8080/api/v1'
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
            const result = await axios({
                url: BASE_URL + url,
                method,
                data,
                params,
                headers,
            })
            return { data: result.data.data }
        } catch (axiosError) {
            const err = axiosError as AxiosError
            const error =  {
                status: err.response?.status,
                data: err.response?.data || err.message,
            }
            console.log("error:", error)
            return {
                error:error
            }
        }
    }

