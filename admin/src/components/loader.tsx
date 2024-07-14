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
import { LoaderCircle } from "lucide-react";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";

export function Loader() {
    const loading = useAppSelector((state: RootState) => state.global.loading);

    return (
        <Dialog open={loading}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Loader</Button>
            </DialogTrigger> */}
            <DialogContent
                className="bg-transparent flex items-center justify-center border-none max-w-[100px] max-h-[100px] shadow-none"
                // onInteractOutside={onClose}
            >
                <LoaderCircle
                    size={48}
                    strokeWidth={1.5}
                    color="white"
                    className="inline-block box-border animate-spin w-[48px] h-[48px]"
                />
            </DialogContent>
        </Dialog>
    );
}
