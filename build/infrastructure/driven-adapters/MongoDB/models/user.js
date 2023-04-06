"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
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
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usedPasswords: [String],
    phone: {
        type: String,
        required: true
    },
    profilePicture: String,
    birthdate: {
        type: String,
        required: true
    },
    tokens: [String],
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Customer", customerSchema);
