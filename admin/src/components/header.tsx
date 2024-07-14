import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { BsList } from "react-icons/bs";
import { UserNav } from "./userNav";

const Header = () => {
    //styles
    const { toggleCollapse, invokeToggleCollapse } = useSidebarToggle();
    const headerStyle = classNames(
        "fixed bg-white w-full px-4 z-0 shadow-sm shadow-slate-500/40  z-[47]",
        {
            ["sm:pl-[21rem]"]: !toggleCollapse,
            ["sm:pl-[5.6rem]"]: toggleCollapse,
        }
    );
    //

    const setSidebarToggle = () => {
        invokeToggleCollapse();
    };
    return (
        <header className={headerStyle}>
            <div className="h-16 flex items-center justify-between">
                <button
                    onClick={setSidebarToggle}
                    className="order-2 sm:order-1 bg-sidebar-muted text-[#6e768e] hover:bg-white ml-3 rounded-md h-[30px] w-[30px] shadow-md shadow-black/10 trasition duration-300 ease-in-out flex justify-center items-center"
                >
                    <BsList />
                </button>
                <div className="order-1 sm:order-2 h-10 w-10 rounded-full bg-[#3a3f48] flex items-center justify-center text-center">
                    <UserNav />
                </div>
            </div>
        </header>
    );
};

export default Header;
