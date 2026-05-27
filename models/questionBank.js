const {Schema, model} = require("mongoose")

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["easy","medium","hard"],
    },
    role: {
        type: String,
        enum: ["backend","frontend","cybersecurity"],
    },
    order: {
        type: Number,
    },
    tags: [String],
}, {timestamps: true});

const Question = model("question",questionSchema);

module.exports = Question;