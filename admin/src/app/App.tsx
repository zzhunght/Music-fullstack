import MainLayout from "@/components/mainLayout";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import Login from "./login/page";

export default function App({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathName = usePathname();
    let user : any
    if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user") as string);
    }

    useEffect(() => {
        if (!user) router.replace("/login");
    }, [user]);

    return (
        <div>
            {pathName == "/login" || !user ? (
                <>
                    <Login />
                </>
            ) : (
                <MainLayout>{children}</MainLayout>
            )}
        </div>
    );
}
