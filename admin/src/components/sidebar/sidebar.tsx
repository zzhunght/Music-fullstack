"use client";
import Image from "next/image";
import logo from "../../app/assets/logo.jpg";
import { SIDEBAR_ITEMS } from "../../app/constants/SIDEBAR";
import classNames from "classnames";
import { SidebarMenuGroup } from "./sidebarMenuGroup";

const Sidebar = () => {


    const asideStyle = classNames(
        "text-gray-500 h-[100vh] w-1/5  transition duration-300 ease-in-out z-[49] sticky top-0 px-14 bg-white");
    return (
        <div className={asideStyle}>
            <div className="flex relative items-end py-5 ">
                <Image
                    alt="logo"
                    src={logo}
                    className="w-12  min-h-fit rounded-lg"
                    width={35}
                    height={35}
                />
                <h3 className="pl-2 font-bold text-2xl text-black min-w-max">
                    Meo Music
                </h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-4 ">
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <SidebarMenuGroup key={index} menuItem={item} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
