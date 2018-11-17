const express = require("express");
const router = express.Router();
const db = require("../../models");

router.post("/register", function (req, res) {
    console.log('register is hitting')
    let thisUserId = "";
    db.User.create(req.body, function (err, response) {
        if (err) {
            return res.json(err);
        }
        console.log(response._id);
        thisUserId = response._id;
        db.MasterProblem.find({}, function (err, problems) {
            if (err) {
                return res.json(err);
            }
            for(let i = 0; i < problems.length; i++){
                let newProblem = {
                    A: problems[i].A,
                    B: problems[i].B,
                    C: problems[i].C,
                    linearCoefficients: problems[i].linearCoefficients,
                    binomialFactors: problems[i].binomialFactors,
                    solved: false,
                }
                db.UserProblem.create(newProblem).then(function(userP){
                    db.User.findOneAndUpdate({_id:thisUserId}, { $push: { problems: userP} }, { new: true }).then(function(finished){
                        console.log("Updated!", finished)
                    })
                })
            }
            res.json(response)
        })
    });
});

router.post("/login", function (req, res) {
    db.User.findOne({ username: req.body.username }, function (error, response) {
        console.log(response);
        if (error) {
            return res.json(error)
        }
        response.comparePassword(req.body.password, function (error, user) {
            if (error) {
                return res.json(error)
            }
            res.json({ user: user, response: response });
        });
    })
})

router.put("/problems/:id", function (req, res) {
    res.send("Update Users")
});

router.delete("/api/user/:id", function (res, res) {
    res.send("Delete Users")
});

module.exports = router;