"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { TableRecentSales } from "@/components/ui/customs/dataTables/tableRecentSales";

const data: Sales[] = [
    {
        id: 1,
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: 2,
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: 3,
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: 4,
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: 5,
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },

    {
        id: 6,
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: 7,
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },

    {
        id: 8,
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: 9,
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
];

export type Sales = {
    id: number;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<Sales>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
];

export function RecentSales() {
    return (
        <div className="w-full">
            <TableRecentSales data={data} columns={columns} />
        </div>
    );
}
