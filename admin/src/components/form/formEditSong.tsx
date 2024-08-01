"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { ComboboxArtist } from "../comboboxArtist";
import { fileToBase64, setReleaseDate } from "@/utils/helpers";
import { uploadImage } from "@/utils/uploadImageCloudinary";
import { ChangeEvent, useEffect, useState } from "react";
import { downloadUrl, uploadFileAudio } from "@/utils/uploadFileToFireBase";
// import useSong from "@/hooks/useSong";
import { ComboboxCategory } from "../comboboxCategory";
import { useUpdateSongMutation } from "@/api/songApi";
import { toast } from "../ui/use-toast";
import { Song } from "@/interface/song";
import useUpload from "@/hooks/useUpload";
import { BUCKET_PATH } from "@/app/constants/firebase";
import Loading from "../loading";
dayjs.extend(utc);

const formSchema = z.object({
    name: z.string().min(0, {
        message: "Vui lòng nhập tên bài hát.",
    }),
    thumbnail: z.string().min(0, {
        message: "Vui lòng nhập hình thu nhỏ của bài hát.",
    }),
    path: z.string().min(0, {
        message: "Vui lòng nhập đường dẫn của bài hát.",
    }),
    // lyrics: z.string().min(0, {
    //     message: "Vui lòng nhập lời bài hát.",
    // }),
    duration: z.number().min(1, {
        message: "Vui lòng nhập thời lượng của bài hát.",
    }),
    artist_id: z.number().min(0, {
        message: "Vui lòng nhập ID của nghệ sĩ.",
    }),
    release_date: z.date({
        required_error: "Vui lòng nhập ngày phát hành.",
    }),
    category_id: z.number().min(1, {
        message: "Vui lòng chọn danh mục.",
    }),
});

export function FormEditSong({
    data,
    setOpen,
}: {
    data: Song;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [updateSong, updateSongResult] = useUpdateSongMutation()

    const [preview, setPreview] = useState({
        image: "",
    });
    const { loading, uploadFile } = useUpload()
    const [image, setImage] = useState<File | null>(null)

    const [audio, setAudio] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            thumbnail: data.thumbnail,
            path: data.path,
            // lyrics: data.lyrics,
            duration: data.duration,
            artist_id: data.artist_id,
            category_id: data.category_id,
            release_date: new Date(data.release_date),
        },
    });

    const handleImageToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // handlePreview(file);
        if (file) {
            setPreview({ image: URL.createObjectURL(file) });
            form.setValue("thumbnail", "file");
            setImage(file)

        }
    };

    const handleAudioFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        await uploadFileAudio(file);
        const url = await downloadUrl(file);
        console.log("url: " + url);
        setAudio(url);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const formatReleaseDate = setReleaseDate(values.release_date);
        values.release_date = formatReleaseDate as any;
        values.thumbnail = data.thumbnail;

        if (image) {
            const url = await uploadFile(image, BUCKET_PATH.songs)
            if (url) {
                values.thumbnail = url;
            }
        }
        values.path = audio ? audio : data.path;
        updateSong({
            id: data.id,
            body: values
        })
    }

    useEffect(() => {
        if (updateSongResult.data) {
            setOpen(false);
            toast({
                title: "Cập nhật bài hát",
                description: "Cập nhật thành công",
            });
        }
    }, [updateSongResult])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
            >
                <div className="flex flex-col space-y-12">
                    <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field }) => (
                                    <FormItem className="h-[200px]">
                                        <Label htmlFor="thumbnail">
                                            <div className="w-full h-full border-dashed border-gray-400 border-2 rounded-xl flex flex-col items-center justify-center space-y-2">
                                                <img
                                                    className="object-cover h-[190px]"
                                                    alt="song"
                                                    src={
                                                        preview.image
                                                            ? preview.image
                                                            : data.thumbnail
                                                    }
                                                />
                                            </div>
                                        </Label>
                                        <FormControl>
                                            <Input
                                                onChange={handleImageToBase64}
                                                id="thumbnail"
                                                // {...field}
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
                            name="path"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File nhạc</FormLabel>
                                    <FormControl>
                                        <Input
                                            onChange={handleAudioFile}
                                            type="file"
                                            placeholder="path"
                                        // {...field}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời lượng</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Duration"
                                            {...field}
                                            type="number"
                                            onChange={e => form.setValue("duration", parseInt(e.target.value))}
                                        />
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
                                                selected={new Date(field.value)}
                                                onSelect={value => {
                                                    value && form.setValue("release_date", value)
                                                }}
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
                                            valueArtistId={
                                                data.artist_id
                                            }
                                            valueArt={(value) =>
                                                form.setValue("artist_id", value)
                                            }
                                            {...field}
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
                                            categoryId={data.category_id || 0}
                                            valueArt={(value) =>
                                                form.setValue("category_id", value)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage title="Nghệ sĩ không được bỏ trống" />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name="lyrics"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lyrics</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Lyrics"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                </div>
                <Button type="submit" className="ml-auto mt-auto">
                    {loading ? <Loading /> : 'Lưu thay đổi'}
                </Button>
            </form>
        </Form>
    );
}
