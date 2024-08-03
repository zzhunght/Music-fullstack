import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import classNames from "classnames";
import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
    const { toggleCollapse } = useSidebarToggle();
    const pageStyle = classNames("flex-grow text-black ");

    return <div className={pageStyle}>{children}</div>;
};

export default PageWrapper;
