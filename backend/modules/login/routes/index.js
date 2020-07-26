/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const express = require("express");
const login_router = express.Router();
const { LoginController } = require("../controllers/LoginController");

login_router.post("/", (req, res) => {
    try {
        let userData = req.body.data;
        console.log(userData);

        LoginController(userData, (response) => {
            if (response === "4")
                return res.status(200).send("User logged in successfully!");
            else
                return res.status(403).send("User does not exists!");
        });
    } catch (err) {
        console.log("err", err);
        return res.status(403).send("User not found");
    }
});

login_router.get("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.post("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.put("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.delete("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = login_router;
