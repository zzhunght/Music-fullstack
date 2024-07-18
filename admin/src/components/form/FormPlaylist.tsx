"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { CalendarIcon, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { ComboboxArtist } from "../comboboxArtist";
import { useToast } from "@/components/ui/use-toast";
import { ComboboxCategory } from "../comboboxCategory";
import { uploadImage } from "@/utils/upload";
import { BUCKET_PATH } from "@/app/constants/firebase";
import { useCreatePlaylistMutation } from "@/api/playlistApi";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Tên không được để trống.",
    }),
    thumbnail: z.string().min(1, {
        message: "Vui lòng chọn ảnh",
    }),
    description: z.string().min(1, {
        message: "Vui lòng điền mô tả",
    }),
    artist_id: z.number().nullable(),
    category_id: z.number().nullable(),
});

export function FormPlaylist({
    setOpen,
}: {
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [preview, setPreview] = useState({
        image: "",
    });
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null)
    const [createPlaylist, result]= useCreatePlaylistMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            thumbnail: "",
            artist_id: 0,
            category_id: 0,
        },
    });

    const handleImageToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setFile(file);
        if (file) {
            setPreview({ image: URL.createObjectURL(file) });
            form.setValue("thumbnail", "file");
        }
    };



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("values ", values)
            const payload = { ...values }

            // loại bỏ giá trị mặc định của id là 0 nếu 0 thì set null
            payload.artist_id = payload.artist_id ?? null
            payload.category_id = payload.category_id ?? null
            payload.thumbnail = payload.thumbnail != 'file' ? payload.thumbnail : ""

            if (file) {
                const url = await uploadImage(file, BUCKET_PATH.artist)
                if (url) {
                    payload.thumbnail = url;
                }
            }
            createPlaylist(payload)
        } catch (error: any) {
            toast({
                title: "Thất bại",
                description: error.message,
            })
        }

    }

    useEffect(()=> {
        if(result.data){
            setOpen(false)
            toast({
                title: "Thành công",
                description: "Tạo playlist thành công",
            })
        }
    }, [result])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
            >
                <div className="flex space-x-6">
                    <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                        <div className="flex-1 ">
                            <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field }) => (
                                    <FormItem className="h-[90%]">
                                        {/* <FormLabel>Thumbnail</FormLabel> */}
                                        <Label htmlFor="thumbnail">
                                            {preview.image ? (
                                                <div className="w-full h-full border-dashed 
                                                border-gray-400 border-2 rounded-xl flex
                                                 flex-col items-center justify-center space-y-2 max-h-[400px]"
                                                >
                                                    <img
                                                        className="h-[95%]"
                                                        src={preview.image}
                                                        alt="image"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full border-dashed border-gray-400 border-2 rounded-xl flex flex-col items-center justify-center space-y-2">
                                                    <div>
                                                        <Upload
                                                            strokeWidth={1.5}
                                                        />
                                                    </div>

                                                    <span>Thumbnail</span>
                                                    <span className="text-xs text-gray-400">
                                                        JPG, PNG (Max 5MB)
                                                    </span>
                                                </div>
                                            )}
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="thumbnail"
                                                // {...field}
                                                onChange={handleImageToBase64}
                                                type="file"
                                                accept="image/png, image/gif, image/jpeg"
                                                className="hidden"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mô tả" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="artist_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Nghệ sĩ</FormLabel>
                                    <FormControl>
                                        <ComboboxArtist

                                            valueArtistId={0}
                                            valueArt={(value) =>
                                                form.setValue("artist_id", value)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Danh mục</FormLabel>
                                    <FormControl>
                                        <ComboboxCategory
                                            categoryId={0}
                                            valueArt={(value) =>
                                                form.setValue("category_id", value)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="ml-auto">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
