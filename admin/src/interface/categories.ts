export interface Category {
    id: number;
    name: string;
    thumbnail: string;
    color: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryParams {
    name: string;
    thumbnail: string;
    color: string;
}

export interface UpdateCategoryParams {
    id: number;
    name: string;
    thumbnail: string;
    color: string;
}