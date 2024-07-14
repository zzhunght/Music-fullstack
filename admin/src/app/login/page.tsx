import FormLogin from "@/components/formLogin";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import imgLogin from "../assets/login_image.jpg";

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
                        <CardTitle>Login dashboard</CardTitle>
                        <CardDescription>Harmony</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormLogin />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
