
export interface AddSongToPlaylist {
    song_id: number;
    playlist_id: number;
}

export interface RemoveSongToPlaylist {
    song_id: number;
    playlist_id: number;
}
export interface CreatePlaylistResponse {
    account_id: number
    artist_id: any
    category_id: any
    created_at: string
    description: any
    id: number
    name: string
    thumbnail: any
}