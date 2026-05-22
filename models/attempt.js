const {Schema, model} = require("mongoose");

const attemptSchema = new Schema({
    attempt_no: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    totalScore: {
        type: Number
    },
}, {timestamps: true});

const Attempt = model("attempt", attemptSchema);

module.exports = Attempt;