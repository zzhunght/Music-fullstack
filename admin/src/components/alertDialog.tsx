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
import { useDeleteSongMutation } from "@/api/songApi";
import { useEffect } from "react";

export function AlertDialogSubmit({ idSongDel }: { idSongDel: number }) {
    const [deleteSong, result] = useDeleteSongMutation()
    const { toast } = useToast();

    const handleSubmit = async () => {
        console.log(idSongDel);
        deleteSong(idSongDel);
    };

    useEffect(()=>{
        if(result.data){
        
            toast({
                title: 'Thành công',
                description: 'Xóa bài hát thành công',
            })
        }

        if(result.error){
            toast({
                title: 'Thất bại',
                description: 'Xóa bài hát thất bại',
            })
        }
    
    },[])

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    Delete song
                </Button>
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
function handleDeleteSong(arg0: number) {
    throw new Error("Function not implemented.");
}

