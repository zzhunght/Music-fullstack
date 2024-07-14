"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
// import { Provider, useSelector } from "react-redux";
// import { RootState, store } from "@/store/store";
// import MainLayout from "@/components/mainLayout";
// import { usePathname } from "next/navigation";
// import ProtectedRoute from "@/context/ProtectedRoute";
// import { UserProvider } from "@/context/UserProvider";
import App from "./App";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [toggleCollapse, setToggleCollapse] = useState(false);

    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <div className="App">
                        <App>
                            {children}
                        </App>
                    </div>
                    <Toaster />
                </StoreProvider>
            </body>
        </html>
    );
}
