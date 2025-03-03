import axios from "axios";
import LocalStorage from "./storage";

const baseURL = import.meta.env.VITE_BASE_API_URL;

export const instance = axios.create({
  baseURL: baseURL,
});

export default class Axios {
    static setAuthenticationToken(token: string) {
        this.setAxiosHeader("Authorization", `Bearer ${token}`);
        LocalStorage.setItem("token", token);
    }

    private static setAxiosHeader(key: string, value: any) {
        instance.defaults.headers.common[key] = value;
    }
}