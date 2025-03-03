export default class Result<T> {
    private success: boolean;
    private message: string;
    private data: T | null;

    /* OVERLOAD İMZALARI */
    constructor();
    constructor(success: boolean);
    constructor(success: boolean, message?: string, data?: T);
    
    /* KONSTRÜKTÖR İMPLANTASYONU */
    constructor(success?: boolean, message?: string, data?: T) {
        this.success = success ?? true;
        this.message = message ?? "";
        this.data = data ?? null;
    }
}
