import { model, Schema } from 'mongoose';

const inventorySchema = new Schema({
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
            requierd: true
        },
        inStock: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        default: "ACTIVE"
    }
},{
    timestamps: true,
});

export default model('Inventory', inventorySchema);