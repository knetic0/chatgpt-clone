import { User } from "./user"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    data: {
        user: User
        token: string
    }
}