const express = require("express");
const router = express.Router();
const db = require("../../models");
const mongoose = require("mongoose");

router.get("/:id", function (req, res) {
    //update this to get info about one user
    db.User.findOne({ _id: req.params.id })
        .populate("problems")
        .then(function (response) {
            console.log("test", response);
            res.json(response)
        })
});

router.put("/problem/:id", function (req, res) {
    db.UserProblem.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { solved: true } })
        .then(function (response) {
            console.log(response);
            res.json(response)
        })
        .catch(err => res.status(422).json(err));
});

router.put("/:id", function (req, res) {
    let pointsIncrease = req.body.pointsToAdd;
    db.User.findOneAndUpdate({ _id: req.params.id }, { $inc: { points: pointsIncrease } })
        .then(function (response) {
            res.json(response)
        })
        .catch(err => res.status(422).json(err));
});

module.exports = router;