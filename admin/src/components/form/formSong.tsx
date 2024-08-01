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
import { Label } from "@/components/ui/label";
import { CalendarIcon, CircleCheckBig, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { fileToBase64, setReleaseDate } from "@/utils/helpers";
import { uploadImage } from "@/utils/uploadImageCloudinary";
import { ChangeEvent, useEffect, useState } from "react";
import { ComboboxArtist } from "../comboboxArtist";
import { downloadUrl, uploadFileAudio } from "@/utils/uploadFileToFireBase";
import { useToast } from "@/components/ui/use-toast";
import { ComboboxCategory } from "../comboboxCategory";
import { useCreateSongMutation } from "@/api/songApi";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Please enter song name.",
    }),
    thumbnail: z.string().min(1, {
        message: "Please enter song thumbnail",
    }),
    path: z.string().min(1, {
        message: "Please enter song path",
    }),
    lyrics: z.string().min(0, {
        message: "Please enter song lyric.",
    }),
    duration: z.number().min(1, {
        message: "Please enter song duration.",
    }),
    artist_id: z.number().min(1, {
        message: "Please enter song duration.",
    }),
    category_id: z.number().min(1, {
        message: "Please select category.",
    }),
    release_date: z.date({
        required_error: "A date of birth is required.",
    }),
});

export function FormSong({
    setOpen,
}: {
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [create, result] = useCreateSongMutation()
    const [preview, setPreview] = useState({
        image: "",
    });
    const [audio, setAudio] = useState("");
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            thumbnail: "",
            path: "",
            lyrics: "",
            duration: 1,
            artist_id: 2,
            release_date: new Date(),
        },
    });

    const handlePreview = async (file: any) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64 as any);
        formData.append(
            "upload_preset",
            process.env.presetCloudinary as string
        );
        const urlUpload = await uploadImage(formData);
        setPreview({ image: urlUpload as any });
    };

    const handleImageToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        handlePreview(file);
    };

    const handleAudioFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        await uploadFileAudio(file);
        const url = await downloadUrl(file);
        console.log("url: " + url);
        setAudio(url);
    };

    useEffect(() => {
        form.setValue("thumbnail", preview.image);
    }, [preview.image]);

    useEffect(() => {
        form.setValue("path", audio);
    }, [audio]);

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formatReleaseDate = setReleaseDate(values.release_date);
        values.release_date = formatReleaseDate as any;

        console.log(values);
        create(values)
        // const res = await handleCreateSong(values);
        // console.log(res);
        // if (res) {
        //     
        // } else {
        //     
        // }
    }

    useEffect(() => {
        if (result.data) {
            setOpen(false);
            toast({
                title: "Create a new song",
                description: "Tạo  bài hát thành công",
            });
        }
        if (result.error) {
            toast({
                variant: "destructive",
                title: "Create a new song",
                description: "Error, Try again later!",
            });
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
                                                <div className="
                                                w-full h-full max-h-[200px] border-dashed 
                                                border-gray-400 border-2 rounded-xl 
                                                flex flex-col items-center 
                                                justify-center space-y-2 overflow-hidden
                                                ">
                                                    <img
                                                        className=" object-cover"
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
                                                accept="image/*"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="path"
                                render={({ field }) => (
                                    <FormItem className="h-[90%]">
                                        {/* <FormLabel>Thumbnail</FormLabel> */}
                                        <Label htmlFor="path">
                                            <div className="w-full h-full border-dashed border-gray-400 border-2 rounded-xl flex flex-col items-center justify-center space-y-2">
                                                {audio ? (
                                                    <div className="flex flex-col space-y-2 justify-center items-center">
                                                        <CircleCheckBig
                                                            strokeWidth={1.5}
                                                        />
                                                        <span>
                                                            Đã thêm bài hát!
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <Upload
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                            />
                                                        </div>

                                                        <span>File nhạc</span>
                                                        <span className="text-xs text-gray-400">
                                                            MP3, or WOFF2 (Max
                                                            5MB)
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="path"
                                                onChange={handleAudioFile}
                                                // {...field}
                                                type="file"
                                                className="hidden"
                                                accept="audio/*"

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
                                    <FormLabel>Tên bài hát</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
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
                                    <FormLabel>Ngày phát hành</FormLabel>
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
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate
                                        your age.
                                    </FormDescription> */}
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
                                        // {...field}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display Lyrics.
                                    </FormDescription> */}
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
                    Lưu
                </Button>
            </form>
        </Form>
    );
}
