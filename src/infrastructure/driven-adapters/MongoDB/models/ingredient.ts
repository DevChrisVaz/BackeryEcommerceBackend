import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema({
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
    cost: {
        type: Number,
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

export default model('Ingredient', ingredientSchema);