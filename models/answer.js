const {Schema,model} = require("mongoose");

const answerSchema = new Schema({
  attemptId: {
    type: Schema.Types.ObjectId,
    ref: "attempt"
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "question"
  },
  answer: String,
  score: Number,
  aiFeedback: String
});

const Answer = model("answer", answerSchema);

module.exports = Answer;