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

export default model("Customer", customerSchema);