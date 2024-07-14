import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ path }: { path: string }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-lg">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href={`${path}`}
                        className="text-xl font-semibold"
                    >
                        {path}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator /> */}
                {/* <BreadcrumbItem>
                        <BreadcrumbPage>Songs</BreadcrumbPage>
                    </BreadcrumbItem> */}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;
