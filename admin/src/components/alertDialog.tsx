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
                    Xoá bài hát
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn có chắc là muốn xoá dữ liệu này không?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể quay lại.
                        Một khi đã xoá data ở trên server sẽ bị mất!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                        Tiếp tục
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

