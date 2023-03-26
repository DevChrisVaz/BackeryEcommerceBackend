import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "TAG"
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    },
}, {
    timestamps: true
});

export default model("Category", categorySchema);