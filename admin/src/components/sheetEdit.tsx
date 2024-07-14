import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FormEditSong } from "./formEditSong";
import { useState } from "react";

export function SheetEdit({ data }: { data: any }) {
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
                <FormEditSong setOpen={setSheetOpen} data={data} />
            </SheetContent>
        </Sheet>
    );
}
