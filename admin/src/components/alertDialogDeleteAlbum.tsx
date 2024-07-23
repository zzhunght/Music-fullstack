"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

export function AlertDialogDeleteAlbum({ idSongDel }: { idSongDel: number }) {
    const { toast } = useToast();

    const handleSubmit = async () => {
        console.log(idSongDel);
        // const res = await handleDeleteAlbum(Number(idSongDel));
        // console.log(res);
        // if (res) {
        //     toast({
        //         title: "Delete album",
        //         description: res.message,
        //     });
        // } else {
        //     toast({
        //         variant: "destructive",
        //         title: "Delete song",
        //         description: "Error, Try again!",
        //     });
        // }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this album?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
