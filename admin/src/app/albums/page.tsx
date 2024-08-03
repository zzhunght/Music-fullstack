import { useGetAlbumQuery } from "@/api/albumApi";
import { AlbumsItem } from "@/components/albumsItem";
import { DialogAddAlbum } from "@/components/dialog/DialogAddAlbum";
import { Loader } from "@/components/loader";

const Albums = () => {
    const {data} = useGetAlbumQuery()
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-4">
            <div>
                <DialogAddAlbum />
                <Loader />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {data?.map((album) => (
                    <AlbumsItem key={album.id} album={album} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default Albums;

