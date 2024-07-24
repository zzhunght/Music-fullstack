"use client";
import { useGetAlbumQuery } from "@/api/albumApi";
import { DialogAddAlbum } from "./dialog/DialogAddAlbum";

import { Loader } from "./loader";
import { AlbumsItem } from "./albumsItem";


const AlbumsGrid = () => {
    // const albums = useAppSelector((state: RootState) => state.album.albums);
    const {data} = useGetAlbumQuery()
    return (
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
    );
};

export default AlbumsGrid;
