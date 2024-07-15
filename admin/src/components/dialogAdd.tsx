"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { FormSong } from "./form/formSong";

export function DialogAdd() {
    // const { isOpen, onOpen, onClose } = useDialog();
    const [open, setOpen] = useState(false);

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Song</Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-[800px]">
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle>Add Song</DialogTitle>
                        <DialogTitle
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            <X size={15} strokeWidth={1.5} />
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FormSong setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
