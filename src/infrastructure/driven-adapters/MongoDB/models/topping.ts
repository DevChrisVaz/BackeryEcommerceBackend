import { model, Schema } from 'mongoose';

const toppingSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    unitOfMeasure: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: String,
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
}, {
    timestamps: true
});

toppingSchema.virtual("categoryRef", {
    ref: "Category",
    localField: "category",
    foreignField: "uuid",
    justOne: true
});

export default model('Topping', toppingSchema);