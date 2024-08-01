import FormLogin from "@/components/form/FormLogin";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Login() {
    return (
        <div className="flex w-screen h-screen justify-center">
            <img
                src={`https://livewallp.com/wp-content/uploads/2021/05/White-Oak-Official-Chillhop-Music-wallpaper-scaled.jpg`}
                className="w-screen "
            />
            <div className="fixed h-screen flex justify-center items-center ">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Đăng nhập</CardTitle>
                        <CardDescription>Meomusic dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormLogin />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
