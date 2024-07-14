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
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { Artist } from "@/interface/artist";
import { uploadImage } from "@/utils/upload";
import { BUCKET_PATH } from "@/app/constants/firebase";
import { useDeleteArtistMutation, useUpdateArtistMutation } from "@/api/artistApi";
export default function AritstSheet({
    artist,
}: {
    artist: Artist;
}) {
    // const { handleUpDateArtists, handleDeleteArtists } = useArtist();
    const [updateArtist, updateResult] = useUpdateArtistMutation()
    const [deleteArtist, deleteResult] = useDeleteArtistMutation()
    const [open, setOpen] = useState(false);

    const [error, setError] = useState("");
    const [form, setForm] = useState(artist);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {
        handleUpload();
    };

    const handleUpload = async () => {
        try {
            if (form.name == "") {
                return setError("Name cannot empty");
            }
            const payload = {
                ...form,
            };
            if (image) {
                const url = await uploadImage(image, BUCKET_PATH.artist)
                if (url) {
                    payload.avatar_url = url;
                }
            }
            await updateArtist({
                id: form.id,
                body: {
                    name: payload.name,
                    avatar_url: payload.avatar_url,
                }
            });
        } catch (error: any) {
            return setError(error.message);
        }
    };
    const handleDelete = async () => {
        deleteArtist(form.id);
    };



    useEffect(() => {
        if (updateResult.data) {
            setOpen(false);

        }
    }, [updateResult])

    useEffect(() => {
        if (deleteResult.data) {
            setOpen(false);

        }
    }, [deleteResult])
    return (
        <Sheet open={open}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
                <div className="px-5 py-3 cursor-pointer hover:bg-slate-100">
                    <img
                        alt="logo"
                        src={artist.avatar_url}
                        className="w-[175px] h-[200px] object-cover rounded"
                    />
                    <p className="mt-[5px] ">{artist.name}</p>
                    <p className="text-[#666]">Artist</p>
                </div>
                {/* </motion.div> */}
            </SheetTrigger>
            <SheetContent
                onCloseClick={() => setOpen(false)}
                onOverlayClick={() => setOpen(false)}
            >
                <div className="my-[10px]">
                    <Label htmlFor="image" className="text-right">
                        Avatar
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
                    <Label htmlFor="image">
                        <img
                            alt="logo"
                            src={form.avatar_url}
                            className="w-[100%]  object-cover rounded"
                        />
                    </Label>
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        className="col-span-3"
                        onChange={(e) => {
                            setError("");
                            setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                            });
                        }}
                    />
                    {error && <p className="text-sm text-[red]">{error}</p>}
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Save Change
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete artist from our
                                        servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            handleDelete();
                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
