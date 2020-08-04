/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const express = require("express");
const reset_password_router = express.Router();
const { ResetPasswordController } = require("../controllers/ResetPasswordController");
const { OtpController } = require("../controllers/OtpController");
const { VerifyOtpController } = require("../controllers/VerifyOtpController");


reset_password_router.post("/", (req, res) => {
    try {
        let userData = req.body.data;
        console.log("came to index.js");
        console.log(userData);

        ResetPasswordController(userData, (response) => {
            if (response === "34")
                return res.status(200).send("Password updated successfully!");
            else
                return res.status(500).send("Password updated failed");
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).send("Password updation failed due to unknown causes");
    }
});

reset_password_router.post("/otp", (req, res) => {
    try {
        let userData = req.body.data;
        console.log("came to otp.js");
        console.log(userData);

        OtpController(userData, (response) => {
            if (response === "38")
                return res.status(200).send("Otp inserted successfully!");
            else
                return res.status(500).send("Otp insertion failed");
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).send("Password updation failed due to unknown causes");
    }
});

reset_password_router.post("/verify", (req, res) => {
    try {
        let userData = req.body.data;
        console.log("came to verify");
        console.log(userData);

        VerifyOtpController(userData, (response) => {
            if (response === "41")
                return res.status(200).send("Otp validation failed!");
            else if (response === "42")
                return res.status(400).send("OTP entered does not match with the sent OTP");
            else
                return res.status(200).send("Otp validated successfully");
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).send("Password updation failed due to unknown causes");
    }
});

reset_password_router.get("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

reset_password_router.post("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

reset_password_router.put("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

reset_password_router.delete("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = reset_password_router;
