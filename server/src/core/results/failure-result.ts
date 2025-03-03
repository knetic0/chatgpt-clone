import Result from "./result";

export default class FailureResult<T> extends Result<T> {
    constructor(message?: string, data?: T) {
        super(false, message, data);
    }
}
