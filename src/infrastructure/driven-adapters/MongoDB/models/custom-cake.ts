import { model, Schema } from 'mongoose';
import { Status } from '../../../../domain/constants/status';

const customCakeSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }, 
    size: {
        type: String,
        required: true
    },
    baseFlavor: {
        type: String,
        required: true
    },
    frostingFlavor: {
        type: String,
        required: true
    },
    fillingFlavor: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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

// customCakeSchema.virtual("categoryRef", {
//     ref: "Category",
//     localField: "category",
//     foreignField: "uuid",
//     justOne: true
// });

export default model('CustomCake', customCakeSchema);