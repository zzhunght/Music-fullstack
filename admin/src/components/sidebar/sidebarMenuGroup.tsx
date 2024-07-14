import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { SidebarGroup } from "@/types/types";
import { SidebarMenuItem } from "./sidebarMenuItem";
import classNames from "classnames";

export const SidebarMenuGroup = ({
    menuGroup,
}: {
    menuGroup: SidebarGroup;
}) => {
    const { toggleCollapse } = useSidebarToggle();

    const menuGroupTitleStyle = classNames(
        "py-4 tracking-[.1rem] font-medium uppercase text-sm",
        {
            "text-center": toggleCollapse,
        }
    );

    return (
        <>
            <h3 className={menuGroupTitleStyle}>
                {!toggleCollapse ? menuGroup.title : "..."}
            </h3>
            {menuGroup.menuList.map((item, index) => (
                <SidebarMenuItem key={index} item={item} />
            ))}
        </>
    );
};
