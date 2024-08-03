import { SidebarItem } from "@/types/types";

import { IoMusicalNotes, IoPersonSharp } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { RiAlbumFill } from "react-icons/ri";
import { PiPlaylistFill } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
export const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        title: "Dashboard",
        path: "/",
        icon: AiOutlineDashboard,

    },
    {
        title: "Bài hát",
        path: "/songs",
        icon: IoMusicalNotes
    },
    {
        title: "Nghệ sĩ",
        path: "/artists",
        icon: IoPersonSharp
    },
    {
        title: "Danh mục",
        path: "/categories",
        icon :BiCategoryAlt
    },
    {
        title: "Albums",
        path: "/albums",
        icon: RiAlbumFill
    },
    {
        title: "Playlists",
        path: "/playlist",
        icon: PiPlaylistFill
    },
    // {
    //     title: "Accounts",
    //     path: "/accounts",
    //     icon: <Users strokeWidth={1.5} />,
    // },

];
