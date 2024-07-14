"use client";

import React from "react";
import { useAuthProvider } from "../context/UserProvider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Login from "@/app/login/page";

type Props = { children: React.ReactNode };

function ProtectedRoute({ children }: Props) {
    const pathname = usePathname();
    console.log(pathname);
    const { isReady } = useAuthProvider();
    const router = useRouter();

    React.useLayoutEffect(() => {
        console.log(isReady);
        if (!isReady) {
            router.replace("/login");
        }
    }, [isReady]);

    return <>{children}</>;
}

export default ProtectedRoute;
