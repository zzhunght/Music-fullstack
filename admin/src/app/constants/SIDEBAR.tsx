import { SidebarGroup } from "@/types/types";
import { BsHouseDoor } from "react-icons/bs";
import { LayoutDashboard, GanttChart, Users, Settings } from "lucide-react";

export const SIDEBAR_ITEMS: SidebarGroup[] = [
    {
        title: "Dashboard",
        menuList: [
            {
                title: "Dashboard",
                path: "/",
                icon: <LayoutDashboard strokeWidth={1.5} />,
            },
        ],
    },
    {
        title: "Quản lí",
        menuList: [
            {
                title: "Bài hát ",
                path: "/songs",
                icon: <GanttChart strokeWidth={1.5} />,
                subMenu: true,
                subMenuItem: [
                    {
                        title: "Songs",
                        path: "/songs",
                    },
                    {
                        title: "Nghệ sĩ",
                        path: "/artists",
                    },
                    {
                        title: "Danh mục",
                        path: "/categories",
                    },
                    {
                        title: "Albums",
                        path: "/albums",
                    },
                    {
                        title: "Playlists",
                        path: "/playlist",
                    },
                ],
            },
            // {
            //     title: "Accounts",
            //     path: "/accounts",
            //     icon: <Users strokeWidth={1.5} />,
            // },
        ],
    }
];
