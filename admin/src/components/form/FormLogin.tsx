"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/api/authApi";

const formSchema = z.object({
    email: z.string().min(3, {
        message: "Email không được để trống.",
    }),
    password: z.string().min(1, {
        message: "Mật khẩu phải > 1 kí tự",
    }),
});

export default function FormLogin() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { toast } = useToast();
    const router = useRouter();
    const [login, result] = useLoginMutation()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        login({
            email: values.email,
            password: values.password,
        })
        // if (res?.message === "Login successful") {
        //     console.log("check");
        //     toast({
        //         title: "Login",
        //         description: res.message,
        //     });
        //     router.push("/");
        // } else {
        //     toast({
        //         title: "Login",
        //         description: "Login Fail",
        //     });
        // }
    }

    useEffect(()=>{
        if(result.data){
            console.log("result login ", result.data)
            router.push("/");
        }
    },[result])
    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Đăng nhập</Button>
                </div>
            </form>
        </Form>
    );
}
