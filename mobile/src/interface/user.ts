export interface LoginResponse {
    session_id: string
    user: User
    access_token: string
    refresh_token: string
}
export interface LoginBody {
    email: string
    password: string
}

export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}
