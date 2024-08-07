
export interface Statistics {
    total_artists: number
    total_users: number
    total_songs: number
    total_albums: number
    total_playlist: number
}

export interface ViewStatistics {
    play_date: string
    view_count: number
}

export interface ViewStatisticsQuery {
    start_date: string
    end_date: string
}
