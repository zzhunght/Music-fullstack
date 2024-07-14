import AlbumsGrid from "@/components/albumsGrid";
import BreadCrumb from "@/components/breadCrumb";

const Albums = () => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div>
                <BreadCrumb path="Albums" />
            </div>
            <AlbumsGrid />
        </div>
    );
};

export default Albums;

// the below code
