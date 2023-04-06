"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const status_1 = require("../../../../domain/constants/status");
const productSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [String],
    tags: [String],
    views: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Number,
        requierd: true,
        default: 0
    },
    status: {
        type: String,
        enum: status_1.Status,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
productSchema.virtual("categoryRef", {
    ref: "Category",
    localField: "category",
    foreignField: "uuid",
    justOne: true
});
productSchema.virtual("tagsRef", {
    ref: "Category",
    localField: "tags",
    foreignField: "uuid"
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
