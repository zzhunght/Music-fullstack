import Header from "./header";
import { Loader } from "./loader";
import PageWrapper from "./pagewapper";
import Sidebar from "./sidebar/sidebar";

const MainLayout = ({ children }: any) => {
    return (
        <>
            <Loader />
            <Sidebar />
            <div className="flex flex-col h-full w-full">
                <Header />
                <PageWrapper>{children}</PageWrapper>
            </div>
        </>
    );
};

export default MainLayout;
