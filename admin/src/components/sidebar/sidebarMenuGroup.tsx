import {SidebarItem } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarMenuGroup = ({
    menuItem,
}: {
    menuItem: SidebarItem;
}) => {
    const path = usePathname()
    
    const activeClass = () =>{
        if (path === menuItem.path) {
            return "text-white bg-[#5D5FEF] font-semibold";
        }
        return "text-gray ";
    }
    return (
        <Link className={`flex gap-2 items-center h-[60px] 
            rounded-2xl px-[20px] 
            cursor-pointer ${activeClass()}`}
            href={menuItem.path}
        >
            <menuItem.icon size={24} />
            <p>{menuItem.title}</p>
        </Link>
    );
};
