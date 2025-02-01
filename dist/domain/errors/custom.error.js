"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
    static badRequest(message) {
        return new CustomError(message, 400);
    }
    static unAuthorized(message) {
        return new CustomError(message, 401);
    }
    static forbiden(message) {
        return new CustomError(message, 403);
    }
    static notFound(message) {
        return new CustomError(message, 404);
    }
    static internalServed(message) {
        return new CustomError(message, 500);
    }
}
exports.CustomError = CustomError;
