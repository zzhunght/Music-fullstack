"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import logo from "../../../../app/assets/logo.png";
import { DialogAdd } from "@/components/dialogAdd";
import { AlertDialogSubmit } from "@/components/alertDialog";
import { SheetEdit } from "@/components/sheetEdit";
import { getAllSong } from "@/api/songApi";
import { addSongByAlbumId, getSongNotinByAlbumId } from "@/api/albumApi";
import { useToast } from "../../use-toast";
import { AlertDeleteSongAlbum } from "@/components/alertDeleteSongAlbum";

export type Song = {
    id: number;
    name: string;
    thumbnail: string;
    artists: Artist[];
    duration: number;
    releaseDate: string;
};

type Artist = {
    id: number;
    name: string;
    avatar_url: string;
};

export const columns: ColumnDef<Song>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value);
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            const song = row.original;

            return (
                <img
                    alt="song"
                    src={song.thumbnail}
                    className="h-[50px] w-[50px] object-cover"
                />
            );
        },
    },
    {
        accessorKey: "artists",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Artist Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <>
                    {row.original.artists?.length > 0 &&
                        row.original.artists?.map((art, index) => (
                            <span key={index}>{art.name}</span>
                        ))}
                </>
            );
        },
    },
    {
        accessorKey: "duration",
        header: () => <div className="">Duration</div>,
    },
    {
        accessorKey: "releaseDate",
        header: () => <div className="">Release Date</div>,
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const song = row.original;
    //         console.log(song);
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <div className="w-[50px]">
    //                         <AlertDeleteSongAlbum idSongDel={song.id} />
    //                     </div>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

export function TableAddSongAlbum({
    albumId,
    setOpen,
}: {
    albumId: number;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [idSongs, setIdSongs] = React.useState<number[]>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [songs, setSongs] = React.useState<Song[]>([]);

    const { toast } = useToast();

    React.useEffect(() => {
        (async function () {
            const res = await getSongNotinByAlbumId(albumId);
            const newSongs: Song[] = res.data.map((song: any) => ({
                id: song.id,
                name: song.name,
                thumbnail: song.thumbnail,
                path: song.path,
                artists: song.artists,
                duration: song.duration,
                lyrics: song.lyrics,
                releaseDate: song.release_date,
            }));
            setSongs(newSongs);
        })();
    }, []);

    console.log(idSongs);

    const table = useReactTable({
        data: songs,
        columns,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const addSongAlbum = async () => {
        const res = await addSongByAlbumId({ albumId, idSongs });

        console.log(res);
        if (res) {
            toast({
                title: "Add a new Song to album",
                description: res.data.message,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Create a new album",
                description: "Error, Try again later!",
            });
        }
    };

    return (
        <div className="w-full pl-4 pr-4 pb-4">
            <div className="space-x-4">
                <Button variant={"outline"} onClick={addSongAlbum}>
                    <Plus />
                    <span className="ml-2">Add Song</span>
                </Button>
            </div>
            <div className="flex items-center justify-between py-4 ">
                <Input
                    placeholder="Filter emails..."
                    value={
                        (table
                            .getColumn("email")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    onClick={() => {
                                        const index = idSongs.indexOf(
                                            row.original.id
                                        );
                                        if (index === -1) {
                                            setIdSongs([
                                                ...idSongs,
                                                row.original.id,
                                            ]);
                                        } else {
                                            const updatedSongs = [...idSongs];
                                            updatedSongs.splice(index, 1);
                                            setIdSongs(updatedSongs);
                                        }
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
