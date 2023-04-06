"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "RECEIVED"
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
