import { model, Schema } from 'mongoose';

const toppingTypeSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
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

export default model('ToppingType', toppingTypeSchema);