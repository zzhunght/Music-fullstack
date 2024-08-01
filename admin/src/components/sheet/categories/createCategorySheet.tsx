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
import { SketchPicker } from 'react-color'
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useCreateCategoryMutation } from "@/api/categoriesApi";
import { uploadImage } from "@/utils/upload";
import { BUCKET_PATH } from "@/app/constants/firebase";
export default function CreateCategorySheet() {
    const [createQuery, createResult] = useCreateCategoryMutation()
    const [error, setError] = useState({
        name: "",
        thumbnail: "",
        color: "",

    });
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const [form, setForm] = useState({
        name: "",
        thumbnail: "",
        color: "#fff",
    });

    const validateForm = () => {
        setError(prevError => {
            return {
                name: form.name ? "" : "Tên không thể bỏ trống",
                thumbnail: image ? "" : "Ảnh không được để trống",
                color: form.color ? "" : "Màu nền không được để trống",
            }
        });
        return Object.values(error).every(fieldError => fieldError === "");
    }

    const handleSubmit = async () => {
        try {
            const valid = validateForm();
            if (valid && image) {
                const payload = { ...form }
                const url = await uploadImage(image, BUCKET_PATH.category)
                if (url) {
                    payload.thumbnail = url
                    createQuery(payload)
                }

            }
        } catch (error : any) {
            alert(error.message)
        }
        // handleCreateCategories(form)
        
    };

    const handleColorChange = (value: any) => {
        setForm(old => {
            return {
                ...old,
                color: value.hex
            }
        })
    }

    const reset = () => {
        setForm({
            name: "",
            thumbnail: "",
            color: "",
        });
    };


    useEffect(() => {
        if (createResult.data) {
            console.log("data ", createResult.data);
            reset()
            setOpen(false)
        }
    }, [createResult])
    return (
        <Sheet open={open}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline">Tạo danh mục mới</Button>
            </SheetTrigger>
            <SheetContent
                onCloseClick={() => setOpen(false)}
                onOverlayClick={() => setOpen(false)}
            >
                <div className="my-[10px]">
                    <Label htmlFor="image" className="text-right">
                        Ảnh nền
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
                            {error.thumbnail && (
                                <p className="text-sm text-[red]">
                                    {error.thumbnail}
                                </p>
                            )}
                        </>
                    )}
                    <Label htmlFor="name" className="text-right">
                        Tên danh mục
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
                            Lưu
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
