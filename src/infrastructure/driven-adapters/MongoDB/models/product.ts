import { model, Schema } from 'mongoose';
import { Status } from '../../../../domain/constants/status';

const productSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    images: [String],
    tags: [String],
    views: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Number,
        requierd: true,
        default: 0
    },
    status: {
        type: String,
        enum: Status,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});

productSchema.virtual("categoryRef", {
    ref: "Category",
    localField: "category",
    foreignField: "uuid",
    justOne: true
});

productSchema.virtual("tagsRef", {
    ref: "Category",
    localField: "tags",
    foreignField: "uuid"
});

export default model('Product', productSchema);