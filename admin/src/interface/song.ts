export interface Song {
    id: number
    name: string
    thumbnail: string
    artist_id: number
    path: string
    lyrics: string
    category_id: any
    duration: number
    release_date: any
    created_at: string
    updated_at: any
    artist_name: string
    avatar_url: string
}

export interface CreateSong {
    name: string
    thumbnail: string
    path: string
    lyrics: any
    duration: number
    release_date: any
    artist_id: number
    category_id: number
}
export interface UpdateSong {
    id : number
    body: Omit<Partial<Song>, 'id'>
}