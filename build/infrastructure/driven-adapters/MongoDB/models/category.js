"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "TAG"
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Category", categorySchema);
