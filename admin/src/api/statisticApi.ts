import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base";
import { Statistics, ViewStatistics, ViewStatisticsQuery } from "@/interface/statistics";

const statisticApi = createApi({
    reducerPath: 'statistics',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getStatistic: builder.query<Statistics, void>({
            query: () => ({ url: '/statistic/', method: 'get' }),
        }),
        getViewStatistic: builder.query<ViewStatistics[], ViewStatisticsQuery | null>({
            query: (query) => ({
                url: `/statistic/song-view-statistic?${query && 'start_date=' + query.start_date + '&end_date=' + query.end_date}`,
                method: 'get'
            }),
        })
    })
})


export const{
    useGetStatisticQuery,
    useGetViewStatisticQuery,
    useLazyGetViewStatisticQuery
} = statisticApi

export default statisticApi