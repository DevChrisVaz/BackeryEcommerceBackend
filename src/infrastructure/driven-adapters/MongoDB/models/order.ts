import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
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

export default model('Order', orderSchema);