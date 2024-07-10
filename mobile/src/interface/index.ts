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

export interface Artist {
    id: number
    name: string
    avatar_url: string
    created_at: string
}
export interface SongofArtist {
    id: number
    name: string
    thumbnail: string
    artist_id: number
    path: string
    lyrics: string
    duration: number
    release_date: any
    created_at: string
    updated_at: any
}

export interface ArtistSong {
    artist: Artist
    songs: Song[]
}

export interface Album {
    id: number
    artist_id: number
    name: string
    thumbnail: string
    release_date: string
    created_at: string
}


export interface Playlist {
    id: number
    artist_id: number
    category_id: number
    name: string
    thumbnail: string
    description: string
    created_at: string
}


export interface CreatePlaylist {
    name: string
}

export interface UserPlaylist {
    id: number
    name: string
}
