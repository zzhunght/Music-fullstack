"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { FormAddAlbum } from "../form/formAddAlbum";
import { ReactNode, useState } from "react";
import { Album } from "@/interface/album";

export function DialogEditAlbum({children, album}: {children: ReactNode, album: Album}) {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Dialog
            onOpenChange={setOpenDialog}
            open={openDialog}
            modal
            defaultOpen={openDialog}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="sm:min-w-[800px]"
            >
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle></DialogTitle>
                        <DialogTitle
                            onClick={() => setOpenDialog(false)}
                            className="cursor-pointer"
                        >
                            <X size={15} strokeWidth={1.5} />
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FormAddAlbum setOpen={setOpenDialog} data={album} update={true}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
