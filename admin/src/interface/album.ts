export interface Album {
    id: number;
    name: string;
    thumbnail: string;
    artist_id: number;
    release_date: string;
    created_at: string;
    artist_name: string;
};

export interface CreateAlbumParams {
    name: string;
    thumbnail: string;
    artist_id: number;
    release_date: Date;
}
export interface UpdateAlbumParams {
    id: number;
    body: {
        name: string;
        thumbnail: string;
        artist_id: number;
        release_date: Date;
    }
}
export interface AddSongToAlbum {
    song_id: number;
    album_id: number;
}


export interface RemoveSongFromAlbum {
    song_id: number;
    album_id: number;
}