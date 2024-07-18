"use client";
import { AlbumsItem } from "./albumsItem";
import { DialogAddAlbum } from "./dialog/dialogAddAlbum";

import { Loader } from "./loader";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";

type Album = {
    id: number;
    artistId: number;
    name: string;
    thumbnail: string;
    releaseDate: string;
};

const AlbumsGrid = () => {
    const albums = useAppSelector((state: RootState) => state.album.albums);
    return (
        <div className="space-y-4">
            <div>
                <DialogAddAlbum />
                <Loader />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {albums.map((album, index) => (
                    <AlbumsItem key={index} album={album} />
                ))}
            </div>
        </div>
    );
};

export default AlbumsGrid;
