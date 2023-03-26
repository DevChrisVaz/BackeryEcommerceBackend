import { model, Schema } from 'mongoose';

const providerSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
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

export default model('Provider', providerSchema);