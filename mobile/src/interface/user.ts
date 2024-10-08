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
export interface RegisterBody {
    email: string
    password: string
    name: string
}

export interface ConfirmOTP {
    email: string
    otp: string
}
export interface SendOTP {
    email: string
}
export interface PasswordChangeParam {
    old_password: string
    password: string
}
export interface NameChangeParam {
    name: string
}

export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}
