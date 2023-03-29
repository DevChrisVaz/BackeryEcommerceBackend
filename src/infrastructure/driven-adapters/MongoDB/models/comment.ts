import { model, Schema } from 'mongoose';

const commentSchema = new Schema({
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
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "RECEIVED"
    },
}, {
    timestamps: true
});

export default model("Comment", commentSchema);