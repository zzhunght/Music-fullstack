"use client"
import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetViewStatisticQuery } from "@/api/statisticApi"
import moment from 'moment'
import { Calendar } from "../ui/calendar"
import DatePicker from "../datePicker"
import { Button } from "../ui/button"


const chartConfig = {
    views: {
        label: "Số lượt nghe",
    },
    view_count: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

function SongChart() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("view_count")
    const [start, setStart] = React.useState(moment().subtract(7, 'day').format("YYYY-MM-DD"))
    const [end, setEnd] = React.useState(moment().format("YYYY-MM-DD"))

    const {data, refetch} = useGetViewStatisticQuery({
        start_date: start,
        end_date: end,
    }, {
        refetchOnMountOrArgChange: true
    })

    const total = ()=>{
        return data?.reduce((acc, curr) => acc + curr.view_count, 0)
    }

    // const handleFilter = () => {
    //     refetch({
    //         start_date: start,
    //         end_date: end,
    //     })
    // }

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Thống kê số lượng lượt nghe theo ngày</CardTitle>
                    <div className="flex gap-5 mt-5">
                        <DatePicker
                            value={start}
                            label="Từ ngày"
                            setValue={v =>{
                                setStart(moment(v).format('YYYY-MM-DD'))
                            }}
                        />
                        <DatePicker
                            value={end}
                            label="Tới ngày"
                            setValue={v =>{
                                setEnd(moment(v).format('YYYY-MM-DD'))
                            }}
                        />
                        {/* <Button>Lọc</Button> */}
                    </div>
                </div>
                <div className="flex">
                    {["view_count"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    Tổng số lượt nghe
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="play_date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                return moment(value).format('L')
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={`var(--color-${activeChart})`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default SongChart