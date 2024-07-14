export type SidebarItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    subMenu?: boolean;
    subMenuItem?: SidebarItem[];
};

export type SidebarGroup = {
    title: string;
    menuList: SidebarItem[];
};
