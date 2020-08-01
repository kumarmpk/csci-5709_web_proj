//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Contact Us feature router

const express = require("express");
const crypto = require("crypto");
const { encryption } = require("../../../constants");

const contact_us_router = express.Router();

const { post_contact_us } = require("../controllers/post-contact-us");

contact_us_router.get("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

function encryptFunc(input) {
  input = JSON.stringify(input);
  let key = crypto.createCipher(encryption.algorithm, encryption.password);
  let output = key.update(input, "utf8", "hex");
  output += key.final("hex");
  return output;
}

function decryptFunc(input) {
  let key = crypto.createDecipher(encryption.algorithm, encryption.password);
  let output = key.update(input, "hex", "utf8");
  output += key.final("utf8");
  output = JSON.parse(output);
  return output;
}

contact_us_router.post("/", (req, res) => {
  try {
    let contact_us_obj = decryptFunc(req.body.data);

    post_contact_us(contact_us_obj, (response) => {
      if (response === "19")
        return res.status(500).send(encryptFunc({ data: "19" }));
      if (response === "18")
        return res.status(200).send(encryptFunc({ data: "18" }));
      else return res.status(500).send(encryptFunc({ data: "19" }));
    });
  } catch (err) {
    return res.status(406).send(encryptFunc({ data: "19" }));
  }
});

contact_us_router.post("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

contact_us_router.put("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

contact_us_router.delete("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = contact_us_router;
