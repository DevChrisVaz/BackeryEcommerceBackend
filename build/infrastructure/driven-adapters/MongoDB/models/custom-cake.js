"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const status_1 = require("../../../../domain/constants/status");
const customCakeSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    baseFlavor: {
        type: String,
        required: true
    },
    frostingFlavor: {
        type: String,
        required: true
    },
    fillingFlavor: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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
// customCakeSchema.virtual("categoryRef", {
//     ref: "Category",
//     localField: "category",
//     foreignField: "uuid",
//     justOne: true
// });
exports.default = (0, mongoose_1.model)('CustomCake', customCakeSchema);
