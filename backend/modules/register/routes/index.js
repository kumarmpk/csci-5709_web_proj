/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const express = require("express");
const register_router = express.Router();
const { RegisterController } = require("../controllers/RegisterController");


register_router.post("/", (req, res) => {
    try {
        let userData = req.body.data;
        console.log(userData);

        RegisterController(userData, (response) => {
            return res.status(200).send("User created successfully!");
        });
    } catch (err) {
        console.log("err", err);
        return res.status(406).send("User creation failed");
    }
});

register_router.get("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

register_router.post("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

register_router.put("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

register_router.delete("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = register_router;
