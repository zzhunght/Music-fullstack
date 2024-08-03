export type SidebarItem = {
    title: string;
    path: string;
    icon: React.ElementType;
    subMenu?: boolean;
    subMenuItem?: SidebarItem[];
};

export type SidebarGroup = {
    title: string;
    menuList: SidebarItem[];
};
