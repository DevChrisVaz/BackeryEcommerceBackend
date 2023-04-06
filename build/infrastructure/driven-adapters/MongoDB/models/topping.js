"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const toppingSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    unitOfMeasure: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: String,
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
toppingSchema.virtual("categoryRef", {
    ref: "Category",
    localField: "category",
    foreignField: "uuid",
    justOne: true
});
exports.default = (0, mongoose_1.model)('Topping', toppingSchema);
