import Result from "./result";

export default class SuccessResult<T> extends Result<T> {
    constructor(message?: string, data?: T) {
        super(true, message, data);
    }
}
