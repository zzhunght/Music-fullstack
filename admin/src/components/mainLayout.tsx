import Header from "./header";
import { Loader } from "./loader";
import PageWrapper from "./pagewapper";
import Sidebar from "./sidebar/sidebar";

const MainLayout = ({ children }: any) => {
    return (
        <div className="bg-backgroud flex">
            <Sidebar />
            <div className="flex flex-col h-full w-4/5">
                <Header />
                <PageWrapper>{children}</PageWrapper>
            </div>
        </div>
    );
};

export default MainLayout;
