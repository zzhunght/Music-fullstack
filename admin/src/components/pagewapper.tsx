import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import classNames from "classnames";
import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
    const { toggleCollapse } = useSidebarToggle();
    const pageStyle = classNames("flex-grow text-black p-2 mx-20 mt-16", {
        ["sm:pl-[20.5rem]"]: !toggleCollapse,
        ["sm:pl-[5.6rem]"]: toggleCollapse,
    });

    return <div className={pageStyle}>{children}</div>;
};

export default PageWrapper;
