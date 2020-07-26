/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const express = require("express");
const reset_password_router = express.Router();
const { ResetPasswordController } = require("../controllers/ResetPasswordController");


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
