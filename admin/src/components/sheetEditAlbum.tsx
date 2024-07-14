"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { FormEditAlbum } from "./formEditAlbum";
import { Button } from "./ui/button";

// const data = [
//     {
//         id: 1,
//         name: "data.name",
//         thumbnail: "data.thumbnail",
//         artistId: 1,
//         releaseDate: "data.releaseDate as Date",
//     },
// ];

export function SheetEditAlbum({ data }: { data: any }) {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                    Edit
                </Button>
            </SheetTrigger>
            <SheetContent className=" h-full overflow-y-auto">
                <SheetHeader className="mb-2">
                    <SheetTitle>Edit</SheetTitle>
                </SheetHeader>
                <FormEditAlbum setOpen={setSheetOpen} data={data} />
            </SheetContent>
        </Sheet>
    );
}
