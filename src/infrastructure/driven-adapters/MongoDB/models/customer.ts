import { model, Schema } from 'mongoose';

const customerSchema = new Schema({
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
    email: {
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
    publicKey: {
        type: String,
        required: true
    },
    tokens: [String],
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    },
    isSubscribed: Boolean
}, {
    timestamps: true
});

export default model("Customer", customerSchema);