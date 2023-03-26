import { model, Schema } from 'mongoose';

const shippingAddressSchema = new Schema({
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
},{
    timestamps: true
});

export default model('ShippingAddress', shippingAddressSchema);