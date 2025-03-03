export default class LocalStorage {
    static setItem(key: string, value: any) {
        if(typeof value === "string") {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    static getItem(key: string) {
        const value = localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch{
            return value;
        }
    }
}