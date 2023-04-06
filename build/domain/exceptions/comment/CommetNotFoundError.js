"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentNotFoundError extends Error {
    constructor() {
        super("Comment not found");
        this.name = "CommentNotFound";
    }
}
exports.default = CommentNotFoundError;
