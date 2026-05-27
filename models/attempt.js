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
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "question"
    }],
    role: {
        type: String,
        enum: ["backend", "frontend", "cybersecurity"]
    },
    difficulty: {
        type: String,
        enum: ["easy","medium", "hard"],
    }
}, {timestamps: true});

const Attempt = model("attempt", attemptSchema);

module.exports = Attempt;