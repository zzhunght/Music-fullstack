import MainLayout from "@/components/mainLayout";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import Login from "./login/page";

export default function App({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();
    return (
        <div>
            {pathName == "/login" ? (
                <>
                    <Login />
                </>
            ) : (
                <MainLayout>{children}</MainLayout>
            )}
        </div>
    );
}
