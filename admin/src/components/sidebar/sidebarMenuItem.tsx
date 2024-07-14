"use client";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { SidebarItem } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export const SidebarMenuItem = ({ item }: { item: SidebarItem }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const pathName = usePathname();
    const { toggleCollapse } = useSidebarToggle();

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <>
            {item.subMenu ? (
                <div className="rounded-md min-w-[18px] cursor-pointer">
                    <a
                        className={`flex items-center min-h-[40px] h-full text-black py-2 px-4 hover:bg-gray-100 rounded duration-200
                            ${
                                pathName.includes(item.path)
                                    ? "rounded-md text-black light:text-black bg-gray-100"
                                    : ""
                            }`}
                        onClick={toggleSubMenu}
                    >
                        {item.icon}
                        {!toggleCollapse && (
                            <>
                                <span className="ml-3 text-base leading-6">
                                    {item.title}
                                </span>
                                <BsChevronRight
                                    className={`ml-auto text-xs  ${
                                        subMenuOpen ? "rotate-90" : ""
                                    }`}
                                />
                            </>
                        )}
                    </a>
                    {subMenuOpen && !toggleCollapse && (
                        <div className="border-l-2">
                            <div className="grid gap-y-2 px-10 py-3 leading-5">
                                {item.subMenuItem?.map(
                                    (subItem: SidebarItem, index: number) => (
                                        <Link
                                            key={index}
                                            href={subItem.path}
                                            className={`text-black py-2 px-4 hover:bg-gray-100 rounded duration-200
                                                ${
                                                    subItem.path === pathName
                                                        ? "rounded-md text-black light:text-black bg-gray-100 font-semibold"
                                                        : ""
                                                }
                                            `}
                                        >
                                            <span className="ml-3 leading-6">
                                                {subItem.title}
                                            </span>
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Link
                    href={item.path}
                    className={`flex items-center min-h-[40px] h-full text-black py-2 px-4 hover:bg-gray-100 rounded duration-200 ${
                        item.path === pathName
                            ? "rounded-md text-black light:text-black bg-gray-100 font-semibold"
                            : ""
                    }`}
                >
                    {item.icon}
                    {!toggleCollapse && (
                        <span className="ml-3 leading-6">{item.title}</span>
                    )}
                </Link>
            )}
        </>
    );
};
