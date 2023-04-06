import { model, Schema } from 'mongoose';

const postSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    sections: [{
        subtitle: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: [String]
    }],
    author: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [String],
    status: {
        type: String,
        required: true,
        default: "DRAFT"
    },
}, {
    timestamps: true
});

export default model("Post", postSchema);