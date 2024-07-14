"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Ellipsis, MoreHorizontal } from "lucide-react";
import { SheetEditAlbum } from "./sheetEditAlbum";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlertDialogDeleteAlbum } from "./alertDialogDeleteAlbum";
import { DrawerAlbum } from "./drawerAlbum";
import { useDialogDrawer } from "@/hooks/useDrawer";

export function AlbumsItem({ album }: { album: any }) {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    return (
        <Card className="w-[100%] border-none cursor-pointer">
            <DrawerAlbum
                open={openDrawer}
                setOpen={setOpenDrawer}
                data={album}
            />
            <CardHeader className="p-0" onClick={() => setOpenDrawer(true)}>
                <img
                    className="h-[232px] w-[232px] rounded-md object-cover"
                    alt="album"
                    src={album.thumbnail}
                />
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-between">
                <div>
                    <span className="text-sm font-semibold">{album.name}</span>
                    <p className="text-xs">Black Pink</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <Ellipsis strokeWidth={1.5} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="space-y-1">
                        <div className="w-[100%]">
                            <SheetEditAlbum data={album} />
                        </div>
                        <div className="w-[100%]">
                            <AlertDialogDeleteAlbum idSongDel={album.id} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
            {/* <CardFooter className="flex justify-between p-2"></CardFooter> */}
        </Card>
    );
}
