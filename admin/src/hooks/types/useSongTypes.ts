import { SongParams } from "@/api/songApi";

export type UseSong = {
    GetSongs: () => Promise<void>;
    handleUpdateSong: (id: number, body: SongParams) => Promise<any>;
    handleCreateSong: (body: SongParams) => Promise<any>;
    handleDeleteSong: (id: number) => Promise<any>;
};
