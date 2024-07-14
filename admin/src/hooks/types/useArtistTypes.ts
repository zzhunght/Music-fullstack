import { UpdateArtistParams } from "@/api/artistApi";

export type UseArtist = {
    GetArtists: () => Promise<void>;
    handleUpDateArtists: (
        id: string,
        body: UpdateArtistParams
    ) => Promise<void>;
    handleCreateArtists: (body: UpdateArtistParams) => Promise<void>;
    handleDeleteArtists: (id: string) => Promise<void>;
};
