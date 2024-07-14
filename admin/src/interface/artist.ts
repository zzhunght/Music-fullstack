export interface Artist {
    id: number,
    name: string,
    avatar_url: string,
    created_at: string,
}

export interface CreateArtistParams {
    name: string;
    avatar_url: string;
}

export interface UpdateArtistParams {
    id: number;
    body: CreateArtistParams
}