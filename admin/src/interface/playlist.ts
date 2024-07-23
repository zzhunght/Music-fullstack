export interface Playlist {
    id: number
    name: string
    thumbnail: string
    account_id: number
    artist_id: number
    category_id: number
    description: string
    created_at: string
    updated_at: string
}

export interface CreatePlaylist {
    name: string
    thumbnail: string
    artist_id: number | null
    category_id: number | null
    description: string
}
export interface UpdatePlaylist {
    id: number
    body: {
        name: string
        thumbnail: string
        artist_id: number | null
        category_id: number | null
        description: string
    }
}

export interface AddSongToPlaylist {
    song_id: number;
    playlist_id: number;
}
export interface RemoveSongFromPlaylist {
    song_id: number;
    playlist_id: number;
}