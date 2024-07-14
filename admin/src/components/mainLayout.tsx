import Header from "./header";
import { Loader } from "./loader";
import PageWrapper from "./pagewapper";
import Sidebar from "./sidebar/sidebar";
import { Toaster } from "./ui/toaster";
import { useEffect } from "react";
import useArtist from "@/hooks/useArtist";
import useAlbum from "@/hooks/useAlbum";
import ProtectedRoute from "@/context/ProtectedRoute";
import useCategories from "@/hooks/useCategories";

const MainLayout = ({ children }: any) => {
    return (
        <>
            <Loader />
            <Sidebar />
            <div className="flex flex-col h-full w-full">
                <Header />
                <PageWrapper>{children}</PageWrapper>
            </div>
        </>
    );
};

export default MainLayout;
