import Axios, { instance } from "./axios";
import LocalStorage from "./storage";
import { LoginRequest, LoginResponse } from "./types/auth";

export default class Service {
    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await instance.post<LoginResponse>('/auth/login', credentials);
        const user = response.data.data.user;
        const token = response.data.data.token
        Axios.setAuthenticationToken(token);
        LocalStorage.setItem("user", user);
        return response.data;
    }

    static async tokenCheck(): Promise<void> {
        Axios.setAuthenticationToken(LocalStorage.getItem("token"));
        const response = await instance.post('/auth/token-check');
        return response.data;
    }
}