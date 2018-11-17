const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/factorit");

const masterProblemsSeed = [
    {
        A: 5,
        B: -9,
        C: -2,
        linearCoefficients: [1, -10],
        binomialFactors: ["5x+1", "x-2"]
    },
    {
        A: 3,
        B: -10,
        C: 7,
        linearCoefficients: [-7, -3],
        binomialFactors: ["3x-7", "x-1"]
    },
    {
        A: 12,
        B: -20,
        C: 3,
        linearCoefficients: [-2, -18],
        binomialFactors: ["6x-1", "2x-3"]
    },
    {
        A: 10,
        B: -21,
        C: -49,
        linearCoefficients: [14, -35],
        binomialFactors: ["5x+7", "2x-7"]
    },
    {
        A: 3,
        B: -2,
        C: -5,
        linearCoefficients: [-5, 3],
        binomialFactors: ["3x-5", "x+1"]
    },
    {
        A: 7,
        B: -15,
        C: 2,
        linearCoefficients: [-1, -14],
        binomialFactors: ["7x-1", "x-2"]
    },
    {
        A: 14,
        B: -27,
        C: 9,
        linearCoefficients: [-6, -21],
        binomialFactors: ["7x-3", "2x-3"]
    },
    {
        A: 9,
        B: -12,
        C: -5,
        linearCoefficients: [-15, 3],
        binomialFactors: ["3x-5", "3x+1"]
    },
    {
        A: 12,
        B: -19,
        C: 5,
        linearCoefficients: [-15, -4],
        binomialFactors: ["3x-1", "4x-5"]
    },
    {
        A: 10,
        B: 13,
        C: -3,
        linearCoefficients: [15, -2],
        binomialFactors: ["2x+3", "5x-1"]
    },
    {
        A: 5,
        B: -44,
        C: -9,
        linearCoefficients: [1, -45],
        binomialFactors: ["5x+1", "x-9"]
    },
    {
        A: 5,
        B: -44,
        C: -9,
        linearCoefficients: [1, -45],
        binomialFactors: ["5x+1", "x-9"]
    },
    {
        A: 15,
        B: -1,
        C: -2,
        linearCoefficients: [5, -6],
        binomialFactors: ["3x+1", "5x-2"]
    },
    {
        A: 2,
        B: 17,
        C: 35,
        linearCoefficients: [7, 10],
        binomialFactors: ["2x+7", "x+5"]
    },
    {
        A: 2,
        B: -9,
        C: -18,
        linearCoefficients: [3, -12],
        binomialFactors: ["2x+3", "x-6"]
    },
    {
        A: 5,
        B: -29,
        C: -6,
        linearCoefficients: [1, -30],
        binomialFactors: ["5x+1", "x-6"]
    },
    {
        A: 7,
        B: -48,
        C: -7,
        linearCoefficients: [1, -49],
        binomialFactors: ["7x+1", "x-7"]
    },
    {
        A: 6,
        B: -17,
        C: -5,
        linearCoefficients: [-2, -15],
        binomialFactors: ["3x-1", "2x-5"]
    },
    {
        A: 6,
        B: 19,
        C: 10,
        linearCoefficients: [4, 15],
        binomialFactors: ["3x+2", "2x+5"]
    },
    {
        A: 6,
        B: -17,
        C: -3,
        linearCoefficients: [1, -18],
        binomialFactors: ["6x+1", "x-3"]
    },
    {
        A: 5,
        B: -32,
        C: 12,
        linearCoefficients: [-2, -30],
        binomialFactors: ["5x-2", "x-6"]
    },
    {
        A: 9,
        B: -64,
        C: 7,
        linearCoefficients: [-1, -63],
        binomialFactors: ["9x-1", "x-7"]
    },
    {
        A: 7,
        B: -23,
        C: 6,
        linearCoefficients: [-1, -63],
        binomialFactors: ["7x-2", "x-3"]
    },
    {
        A: 4,
        B: -27,
        C: 18,
        linearCoefficients: [-3, -24],
        binomialFactors: ["4x-3", "x-6"]
    },
    {
        A: 4,
        B: -8,
        C: -21,
        linearCoefficients: [-14, 6],
        binomialFactors: ["2x-7", "2x+3"]
    },
    {
        A: 5,
        B: -12,
        C: 4,
        linearCoefficients: [-2, -10],
        binomialFactors: ["5x-2", "x-2"]
    },
    {
        A: 6,
        B: -23,
        C: 21,
        linearCoefficients: [-14, -9],
        binomialFactors: ["3x-7", "2x-3"]
    },
    {
        A: 2,
        B: 13,
        C: -24,
        linearCoefficients: [-3, 16],
        binomialFactors: ["x+8", "2x-3"]
    },
    {
        A: 3,
        B: -14,
        C: 16,
        linearCoefficients: [-8, -6],
        binomialFactors: ["3x-8", "x-2"]
    },
    {
        A: 5,
        B: 42,
        C: 16,
        linearCoefficients: [2, 40],
        binomialFactors: ["5x+2", "x+8"]
    },
    {
        A: 15,
        B: -4,
        C: -3,
        linearCoefficients: [-9, 5],
        binomialFactors: ["5x-3", "3x+1"]
    },
    {
        A: 15,
        B: -4,
        C: -3,
        linearCoefficients: [-9, 5],
        binomialFactors: ["5x-3", "3x+1"]
    },
    {
        A: 4,
        B: 24,
        C: 27,
        linearCoefficients: [6, 18],
        binomialFactors: ["2x+3", "2x+9"]
    },
    {
        A: 6,
        B: 13,
        C: 6,
        linearCoefficients: [4, 9],
        binomialFactors: ["3x+2", "2x+3"]
    },
];

db.MasterProblem
    .remove({})
    .then(() => db.MasterProblem.collection.insertMany(masterProblemsSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
