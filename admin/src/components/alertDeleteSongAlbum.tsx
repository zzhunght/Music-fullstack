"use client";

import { deleteSongById } from "@/api/songApi";
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
import { deleteSongByAlbumId } from "@/api/albumApi";

export function AlertDeleteSongAlbum({
    albumId,
    idSongDel,
}: {
    albumId: number;
    idSongDel: number[];
}) {
    const { toast } = useToast();

    const handleSubmit = async () => {
        console.log(albumId, idSongDel);
        const res = await deleteSongByAlbumId(albumId, idSongDel);
        console.log(res);
        if (res) {
            toast({
                title: "Delete song",
                description: res.message,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Delete song",
                description: "Error, Try again!",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete song</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this song?
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
