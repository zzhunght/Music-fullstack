"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { FormAddAlbum } from "../formAddAlbum";
import { useState } from "react";

export function DialogAddAlbum() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Dialog
            onOpenChange={setOpenDialog}
            open={openDialog}
            modal
            defaultOpen={openDialog}
        >
            <DialogTrigger asChild>
                <Button variant="outline">Add album</Button>
            </DialogTrigger>
            <DialogContent
                className="sm:min-w-[800px]"
                // onInteractOutside={onClose}
            >
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle>Add</DialogTitle>
                        <DialogTitle
                            onClick={() => setOpenDialog(false)}
                            className="cursor-pointer"
                        >
                            <X size={15} strokeWidth={1.5} />
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FormAddAlbum setOpen={setOpenDialog} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
