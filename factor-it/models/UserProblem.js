const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProblemSchema = new Schema({
  A: { type: Number, required: true },
  B: { type: Number, required: true },
  C: { type: Number, required: true },
  linearCoefficients: {type: Array, required: true},
  binomialFactors: {type: Array, required: true},
  solved: { type: Boolean, default: false },
});

const UserProblem = mongoose.model("UserProblem", userProblemSchema);

module.exports = UserProblem;
