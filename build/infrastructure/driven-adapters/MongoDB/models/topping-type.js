"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const toppingTypeSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('ToppingType', toppingTypeSchema);
