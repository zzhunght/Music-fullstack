"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Math.floor(Math.random() * 1000) +
const data = [
    {
        name: "Nơi này có ...",
        total: 988,
    },
    {
        name: "Những lời hứa...",
        total: 790,
    },
    {
        name: "Hẹn một mai",
        total: 762,
    },
    {
        name: "Nếu ngày ấy",
        total: 662,
    },
    {
        name: "Flower",
        total: 322,
    },
    {
        name: "Fall in luv",
        total: 320,
    },
    {
        name: "Đừng làm trái ...",
        total: 230,
    },
    {
        name: "Sao em nỡ",
        total: 220,
    },
    {
        name: "Let You Love Me",
        total: 67,
    },
    {
        name: "All Of Me",
        total: 50,
    },
];

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="bg-[#ccc]"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
