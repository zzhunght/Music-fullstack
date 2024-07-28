export interface Comment {
    id: number;
    content: string;
    user_id: number;
    name: string;
    avatar?: string;
    created_at: string;
}

export interface CreateCommentParams {
    content: string;
    song_id: number;
}