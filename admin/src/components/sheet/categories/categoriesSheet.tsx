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
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import useCategories from "@/hooks/useCategories";
import { Category, UpdateCategoryParams } from "@/interface/categories";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/api/categoriesApi";
import { FiPlus } from "react-icons/fi";
import { SketchPicker } from "react-color";
import { uploadImage } from "@/utils/upload";
import { BUCKET_PATH } from "@/app/constants/firebase";
export default function CategorySheet({
    category,
    create,
}: {
    category: Category;
    create?: boolean;
}) {
    const { handleDeleteCategories } = useCategories();
    const [open, setOpen] = useState(false);
    const [update, result] = useUpdateCategoryMutation()
    const [deleteCategory, resultDelete] = useDeleteCategoryMutation()

    const [error, setError] = useState("");
    const [form, setForm] = useState(category);
    const [image, setImage] = useState<File | null>(null);

    const validate = () => {
        if (!form.name) {
            setError("Name cannot empty");
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        try {
            const valid = validate()
            if (valid) {
                const payload: UpdateCategoryParams = {
                    id: form.id,
                    name: form.name,
                    thumbnail: form.thumbnail,
                    color: form.color
                }
                if (image) {
                    const url = await uploadImage(image, BUCKET_PATH.category)
                    payload.thumbnail = url ?? payload.thumbnail
                }
                update(payload)
            }
        } catch (error: any) {
            alert(error.message)
        }
    };
    const handleColorChange = (value: any) => {
        setForm(old => {
            return {
                ...old,
                color: value.hex
            }
        })
    }

    const handleDelete = async () => {
       deleteCategory(form.id)
    };

    useEffect(() => {
        if (result.data) {
            setOpen(false)
        }
    }, [result])

    useEffect(() => {
        if (resultDelete.data) {
            setOpen(false)
        }
    }, [resultDelete])
    return (
        <Sheet open={open}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
                <div className="px-5 py-3 cursor-pointer hover:bg-slate-100 w-[175px] h-[175px] rounded overflow-hidden relative"
                    style={{
                        backgroundColor: category.color
                    }}
                >

                    <p className="mt-[5px] text-white font-semibold text-xl">{category.name}</p>
                    <img src={category.thumbnail}
                        style={{
                            position: 'absolute',
                            width: 100,
                            height: 100,
                            bottom: 0,
                            right: 0,
                            transform: 'rotate(23deg) translateX(15px)'
                        }}
                    />
                </div>
                {/* </motion.div> */}
            </SheetTrigger>
            <SheetContent
                onCloseClick={() => setOpen(false)}
                onOverlayClick={() => setOpen(false)}
            >
                <div className="my-[10px]">
                    <Label htmlFor="image" className="text-right">
                        Thumbnail
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
                                    thumbnail: url,
                                });
                                console.log("url created ", url);
                            }
                        }}
                    ></Input>
                    {form.thumbnail ? (
                        <Label htmlFor="image" className="cursor-pointer">
                            <img
                                alt="logo"
                                src={form.thumbnail}
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
                        </>
                    )}
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

                    <Label>
                        Màu sắc
                    </Label>
                    <div className="justify-center flex mt-2">
                        <SketchPicker color={form.color} onChange={handleColorChange} />
                    </div>
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
