/**
 * Created by ed on 18/01/2017.
 */
"use strict";

let crypto = require("crypto");
let Email = require("../services/email");
let ResetPassword = require("../services/resetPassword");

let Constants = require("../Globals");

let Schemas = require("../persistence/schemas");
let express = require("express");
let app = express();

app.post("/api/emailverify/:id", function (req, res) {
    Schemas.researcherData.verifyResearcher(req.params.id, function (err) {
        if (err) throw err;
        res.redirect("/users/verified");
    });
});

/**
 * Holy shit no, time is against us so I am not dealing with this insane mess now
 */
app.post("/send", function (req, res) {
    console.log(req.body);
    req.body["isverified"] = !Constants.shouldVerifyUsers;

    Schemas.researcherAccount.createResearcher(new Schemas.researcherAccount(req.body)
        , function (err, account) {
            if (err) throw err;

            console.log({account})

            res.redirect("/users/login");
        });
});

app.get("/verify", function (req, res) {
    Schemas.researcherAccount.getResearcherById(req.query.id, function (err, reverify) {
        if (err) throw err;
        console.log(reverify);

        reverify.isverified = true;
        reverify.save();
        

        res.redirect("/users/verified");
        res.redirect("/");

    });
});

app.post("/forgot", function (req, res) {
    crypto.randomBytes(20, function (err, buf) {
        let token = buf.toString("hex");
        Schemas.researcherAccount.findOne({email: req.body.email}, function (err, user) {
            if (!user) {
                console.log("No account with that email address exists.");
                req.flash("error", "No account with that email address exists.");
                res.redirect("/forgot");
            }

            console.log(user);

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;

            user.save(function () {
                Email.forgottenPassword(user, req, res);
            });
        });
    });
});

app.get("/reset/:token", function (req, res) {
    Schemas.researcherAccount.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    }, function (err, user) {
        if (!user) {
            req.flash("error", "Password reset token is invalid or has expired.");
            return res.redirect("/help");
        }
        res.render("reset", {
            user: req.user
        });
    });
});

app.post("/reset/:token", function (req, res, done) {
    ResetPassword.confirmResetPassword(req, res, done, Schemas.researcherAccount);
});


module.exports = app;