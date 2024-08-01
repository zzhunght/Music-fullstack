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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ChangeEvent, useEffect, useState } from "react";
import { ComboboxArtist } from "../comboboxArtist";
import { useToast } from "@/components/ui/use-toast";
import { Album } from "@/interface/album";
import { BUCKET_PATH } from "@/app/constants/firebase";
import { uploadImage } from "@/utils/upload";
import { useCreateAlbumMutation, useUpdateAlbumMutation } from "@/api/albumApi";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Vui lòng nhập tên.",
    }),
    thumbnail: z.string().min(1, {
        message: "Ảnh nền không dược bỏ trống",
    }),
    artist_id: z.number().min(1, {
        message: "Nghệ sĩ không được bỏ trống",
    }),
    release_date: z.date({
        required_error: "Ngày ra mắt",
    }),
});

export function FormAddAlbum({
    setOpen,
    data,
    update
}: {
    data?: Album,
    update?: boolean
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState({
        image: "",
    });
    const { toast } = useToast();
    const [createAlbum, createResult] = useCreateAlbumMutation()
    const [updateAlbum, updateResult] = useUpdateAlbumMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            thumbnail: "",
            artist_id: 0,
            release_date: new Date(),
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

            payload.thumbnail = payload.thumbnail != 'file' ? payload.thumbnail : ""

            if (file) {
                const url = await uploadImage(file, BUCKET_PATH.album)
                if (url) {
                    payload.thumbnail = url;
                }
            }
            if (update && data) {
                updateAlbum({
                    id: data.id,
                    body: payload
                })
            } else {
                createAlbum(payload)
            }
        } catch (error: any) {
            toast({
                title: "Thất bại",
                description: error.message,
            })
        }
    }
    useEffect(() => {
        if (createResult.data) {
            setOpen(false)
            toast({
                title: "Thành công",
                description: "Tạo Album thành công",
            })
        }
    }, [createResult])

    useEffect(() => {
        if (data && update) {
            form.setValue("name", data.name)
            form.setValue("thumbnail", data.thumbnail)
            form.setValue("artist_id", data.artist_id)
            form.setValue("release_date", new Date(data.release_date))
            setPreview({ image: data.thumbnail })
        }
    }, [data, update])

    useEffect(() => {
        if (updateResult.data) {
            setOpen(false)
            toast({
                title: "Thành công",
                description: "Cập nhật playlist thành công",
            })
        }
    }, [updateResult])

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
                                        <Label htmlFor="thumbnail">
                                            {preview.image ? (
                                                <div className="w-full h-full border-dashed border-gray-400 border-2 rounded-xl flex flex-col items-center justify-center space-y-2">
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
                            name="release_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Ngày ra mắt</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                        "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                    new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                  
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
                                            valueArtistId={data?.artist_id || 0}
                                            valueArt={(value) =>
                                                form.setValue("artist_id", value)
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
