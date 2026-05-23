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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  answer: String,
  score: Number,
  aiFeedback: String
});

answerSchema.index({ attemptId: 1, questionId: 1 }, { unique: true });

const Answer = model("answer", answerSchema);

module.exports = Answer;