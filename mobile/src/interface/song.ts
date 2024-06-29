export interface Song {
    id: number;
    name: string;
    thumbnail: string;
    artist_id: number;
    path: string;
    lyrics: string;
    duration: number;
    release_date: string | null;
    created_at: string;
    updated_at: string | null;
    artist_name: string;
    avatar_url: string;
}

