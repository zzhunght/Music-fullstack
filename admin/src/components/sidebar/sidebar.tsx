"use client";
import Image from "next/image";
import logo from "../../app/assets/logo.webp";
import { SIDEBAR_ITEMS } from "../../app/constants/SIDEBAR";
import classNames from "classnames";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { SidebarMenuGroup } from "./sidebarMenuGroup";

const Sidebar = () => {
    const { toggleCollapse } = useSidebarToggle();

    const asideStyle = classNames(
        "fixed bg-sidebar text-gray-500 h-full w-[20rem] border transition duration-300 ease-in-out z-[49]",
        {
            ["sm:w-[5.6rem] sm:left-0 left-[-100%]"]: toggleCollapse,
            ["w-[20rem]"]: !toggleCollapse,
        }
    );
    return (
        <div className={asideStyle}>
            <div className="flex relative items-center py-5 px-3.5">
                <Image
                    alt="logo"
                    src={logo}
                    className="w-12 mx-3.5 min-h-fit"
                    width={35}
                    height={35}
                />
                {!toggleCollapse && (
                    <h3 className="pl-2 font-bold text-2xl text-white min-w-max">
                        Music
                    </h3>
                )}
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <SidebarMenuGroup key={index} menuGroup={item} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
