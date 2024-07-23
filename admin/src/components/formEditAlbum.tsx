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
import { DialogTrigger } from "./ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { Label } from "./ui/label";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ComboboxArtist } from "./comboboxArtist";
import { fileToBase64, setReleaseDate } from "@/utils/helpers";
import { uploadImage } from "@/utils/uploadImageCloudinary";
import { ChangeEvent, useState } from "react";
import { useToast } from "./ui/use-toast";
import { updateAlbumById } from "@/api/albumApi";
import { UpdateAlbum } from "@/store/album";
dayjs.extend(utc);

const formSchema = z.object({
    name: z.string().min(0, {
        message: "Please enter song name.",
    }),
    thumbnail: z.string().min(0, {
        message: "Please enter song thumbnail",
    }),
    artistId: z.number().min(0, {
        message: "Please enter song duration.",
    }),
    releaseDate: z.date({
        required_error: "A date of birth is required.",
    }),
    // apdatedAt: z.date({
    //     required_error: "A date of birth is required.",
    // }),
});

export function FormEditAlbum({
    data,
    setOpen,
}: {
    data: any;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    console.log(data);
    const { toast } = useToast();
    const [preview, setPreview] = useState({
        image: "",
    });
    // ...
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            thumbnail: data.thumbnail,
            artistId: Number(data.artistId),
            releaseDate: data.releaseDate as Date,
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

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formatReleaseDate = setReleaseDate(values.releaseDate);
        values.releaseDate = formatReleaseDate as any;
        values.thumbnail = preview.image ? preview.image : data.thumbnail;
        console.log(values);
        // const res = await handleUpdateAlbum(data.id, values);
        // if (res) {
        //     setOpen(false);
        //     toast({
        //         title: "Create a new song",
        //         description: res.message,
        //     });
        // } else {
        //     toast({
        //         variant: "destructive",
        //         title: "Create a new song",
        //         description: "Error, Try again later!",
        //     });
        // }
    }

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="releaseDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Release Date</FormLabel>
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
                            name="artistId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Artist</FormLabel>
                                    <FormControl className="w-full">
                                        <ComboboxArtist
                                            valueArtistId={data.artistId}
                                            valueArt={(value) =>
                                                form.setValue("artistId", value)
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="ml-auto mt-auto">
                    Save changes
                </Button>
            </form>
        </Form>
    );
}
