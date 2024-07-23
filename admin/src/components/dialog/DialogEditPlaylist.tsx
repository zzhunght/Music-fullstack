"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";
import { FormPlaylist } from "../form/FormPlaylist";
import { Playlist } from "@/interface/playlist";

export function DialogEditPlaylist({children, playlist}: {children: ReactNode, playlist: Playlist}) {
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
                    <FormPlaylist setOpen={setOpenDialog} data={playlist} update={true}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
