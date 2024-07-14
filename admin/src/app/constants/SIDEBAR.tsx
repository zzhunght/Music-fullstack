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
        title: "Mangement",
        menuList: [
            {
                title: "Song & Related",
                path: "/songs",
                icon: <GanttChart strokeWidth={1.5} />,
                subMenu: true,
                subMenuItem: [
                    {
                        title: "Songs",
                        path: "/songs",
                    },
                    {
                        title: "Artists",
                        path: "/artists",
                    },
                    {
                        title: "Categories",
                        path: "/categories",
                    },
                    {
                        title: "Albums",
                        path: "/albums",
                    },
                ],
            },
            // {
            //     title: "Accounts",
            //     path: "/accounts",
            //     icon: <Users strokeWidth={1.5} />,
            // },
        ],
    },
    {
        title: "Settings",
        menuList: [
            {
                title: "Settings",
                path: "/settings",
                icon: <Settings strokeWidth={1.5} />,
            },
        ],
    },
];
