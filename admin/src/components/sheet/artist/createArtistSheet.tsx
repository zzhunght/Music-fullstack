import { useCreateArtistMutation } from "@/api/artistApi";
import { BUCKET_PATH } from "@/app/constants/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { uploadImage } from "@/utils/upload";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
export default function CreateAritstSheet() {
    const [crateArtist, createResult] = useCreateArtistMutation()

    const [error, setError] = useState({
        name: "",
        avatar_url: "",
    });
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        avatar_url: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {
        handleUpload();
    };

    const handleUpload = async () => {
        if (!image || form.name == "") {
            setError({
                ...error,
                name: form.name == "" ? "Name is required" : "",
                avatar_url: !image ? "Avatar is required" : "",
            });
            return null;
        }
        const payload = { ...form }
        if (image) {
            const url = await uploadImage(image, BUCKET_PATH.artist)
            if (url) {
                payload.avatar_url = url;
            }
        }
        crateArtist(payload)
    };
    const reset = () => {
        setForm({
            name: "",
            avatar_url: "",
        });
        setImage(null);
    };


    useEffect(()=>{
        if(createResult.data) {
            console.log("crate data :", createResult.data)
            reset()
            setOpen(false)
        }
    },[createResult])
    return (
        <Sheet open={open}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline">Tạo mới nghệ sĩ</Button>
            </SheetTrigger>
            <SheetContent
                onCloseClick={() => setOpen(false)}
                onOverlayClick={() => setOpen(false)}
            >
                <div className="my-[10px]">
                    <Label htmlFor="image" className="text-right">
                        Ảnh đại diện
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImage(e.target.files[0]);
                                const url = URL.createObjectURL(
                                    e.target.files[0]
                                );
                                setForm({
                                    ...form,
                                    avatar_url: url,
                                });
                                console.log("url created ", url);
                            }
                        }}
                    ></Input>
                    {form.avatar_url ? (
                        <Label htmlFor="image" className="cursor-pointer">
                            <img
                                alt="logo"
                                src={form.avatar_url}
                                className="w-[100%]  object-cover rounded"
                            />
                        </Label>
                    ) : (
                        <>
                            <Label htmlFor="image">
                                <div className="w-[100%] h-[200px] border-[2px] border-dashed flex justify-center items-center rounded cursor-pointer">
                                    <FiPlus size={48} />
                                </div>
                            </Label>
                            {error.avatar_url && (
                                <p className="text-sm text-[red]">
                                    {error.avatar_url}
                                </p>
                            )}
                        </>
                    )}

                    <Label htmlFor="name" className="text-right">
                        Tên
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        className="col-span-3"
                        onChange={(e) => {
                            setError({
                                ...error,
                                name: "",
                            });
                            setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                            });
                        }}
                    />
                    {error.name && (
                        <p className="text-sm text-[red]">{error.name}</p>
                    )}
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            tạo
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
