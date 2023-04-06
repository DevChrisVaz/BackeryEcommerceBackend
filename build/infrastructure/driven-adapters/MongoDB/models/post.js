"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    sections: [{
            subtitle: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            image: [String]
        }],
    author: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [String],
    status: {
        type: String,
        required: true,
        default: "DRAFT"
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Post", postSchema);
