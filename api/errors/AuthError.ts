import BaseError from "./BaseError";


export default class AuthError extends BaseError {
    constructor() {
        super("Unautherized", 401);
    }
}