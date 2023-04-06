"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shippingAddressSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    street: {
        type: String,
        required: true
    },
    suburb: {
        type: String,
        required: true
    },
    externalNumber: {
        type: String,
        required: true
    },
    internalNumber: String,
    phone: String,
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('ShippingAddress', shippingAddressSchema);
