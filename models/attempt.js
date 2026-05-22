const {Schema, model} = require("mongoose");

const attemptSchema = new Schema({
    attemp_no: {
        type: Number
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