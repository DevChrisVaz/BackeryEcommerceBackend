"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: String,
        required: true
    },
    advancePayment: Number,
    products: [{
            product: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
    date: {
        type: String,
        required: true
    },
    deliveryDate: {
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
exports.default = (0, mongoose_1.model)('Order', orderSchema);
