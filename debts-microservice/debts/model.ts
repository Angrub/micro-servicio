import { Schema, model } from "mongoose";

const debtSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const debtModel = model('Debts', debtSchema);

export { debtModel }