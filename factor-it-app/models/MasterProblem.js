const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const masterProblemSchema = new Schema({
  A: { type: Number, required: true },
  B: { type: Number, required: true },
  C: { type: Number, required: true },
  linearCoefficients: {type: Array, required: true},
  binomialFactors: {type: Array, required: true}
});

const MasterProblem = mongoose.model("MasterProblem", masterProblemSchema);

module.exports = MasterProblem;
