import classNames from "classnames";

const Header = () => {
    //styles
    const headerStyle = classNames(
        "bg-white w-full px-2 z-0 z-[47]  rounded-lg");
    return (
        <header className={headerStyle}>
            <div className="h-16 flex items-center sticky">
                <p className="font-semibold">Xin chào ! Hôm nay là {new Date().toLocaleDateString()}</p>
            </div>
        </header>
    );
};

export default Header;
