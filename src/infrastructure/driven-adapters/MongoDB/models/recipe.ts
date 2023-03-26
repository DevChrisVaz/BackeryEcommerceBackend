import { model, Schema } from 'mongoose';

const recipeSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    instructions: {
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

export default model('Recipe', recipeSchema);