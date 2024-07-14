import { AlbumParams } from "@/api/albumApi";

export type UseAlbum = {
    GetAlbums: () => Promise<void>;
    handleUpdateAlbum: (id: number, body: AlbumParams) => Promise<any>;
    handleCreateAlbum: (body: AlbumParams) => Promise<any>;
    handleDeleteAlbum: (id: number) => Promise<any>;
};
