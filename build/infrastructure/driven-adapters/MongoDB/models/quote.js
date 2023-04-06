"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const quoteSchema = new mongoose_1.Schema({
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
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    details: String,
    products: [{
            product: {
                type: String,
                requierd: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true,
});
quoteSchema.virtual("productsRef", {
    ref: "Product",
    localField: "products.product",
    foreignField: "uuid"
});
// quoteSchema.virtual("productsRef").get(async function() {
//     const products = this.products;
//     const productsWithQty = [];
//     for(const item of products) {
//         const product = await model("Product").findById(item.product);
//         productsWithQty.push({
//             product,
//             qty: item.qty
//         });
//     }
//     return productsWithQty;
// });
exports.default = (0, mongoose_1.model)('Quote', quoteSchema);
