//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Task Management feature router

const express = require("express");
const task_router = express.Router();
const { post_task } = require("../controllers/task");
const { get_task } = require("../controllers/task");
const { get_user_rel_details } = require("../controllers/task");
const { put_task } = require("../controllers/task");
const { delete_task } = require("../controllers/task");
const { encryption } = require("../../../constants");
const crypto = require("crypto");

task_router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    get_task(id, (response) => {
      if (response === "19") return res.status(500).send(encryptFunc("19"));
      else if (response) {
        return res.status(200).send(encryptFunc(response));
      } else return res.status(500).send(encryptFunc("19"));
    });
  } catch (err) {
    res.status(406).send(encryptFunc("19"));
  }
});

task_router.get("/user/:id", (req, res) => {
  try {
    let id = req.params.id;

    get_user_rel_details(id, (response) => {
      if (response === "19") return res.status(500).send(encryptFunc("19"));
      else if (response) {
        return res.status(200).send(encryptFunc(response));
      } else return res.status(500).send(encryptFunc("19"));
    });
  } catch (err) {
    res.status(406).send(encryptFunc("19"));
  }
});

task_router.get("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

const mandatory_validate = (obj, response) => {
  if (
    obj &&
    obj.project &&
    obj.type &&
    obj.overview &&
    obj.description &&
    obj.priority &&
    obj.owner &&
    obj.creator
  ) {
    response("25");
  } else {
    response("24");
  }
};

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

task_router.post("/", (req, res) => {
  try {
    let encry_task_obj = req.body.data;
    let task_obj = decryptFunc(encry_task_obj);

    mandatory_validate(task_obj, (validate_response) => {
      if (validate_response === "25") {
        post_task(task_obj, (db_response) => {
          if (db_response === "19")
            return res.status(500).send(encryptFunc("19"));
          else if (db_response)
            return res.status(200).send(encryptFunc({ id: db_response }));
          else return res.status(500).send(encryptFunc("19"));
        });
      } else {
        return res.status(500).send(encryptFunc("24"));
      }
    });
  } catch (err) {
    res.status(406).send(encryptFunc("19"));
  }
});

task_router.post("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

task_router.put("/", (req, res) => {
  try {
    let task_obj = decryptFunc(req.body.data);

    mandatory_validate(task_obj, (validate_response) => {
      if (validate_response === "25") {
        put_task(task_obj, (db_response) => {
          if (db_response === "19")
            return res.status(500).send(encryptFunc("19"));
          else if (db_response)
            return res.status(200).send(encryptFunc(db_response));
          else return res.status(500).send(encryptFunc("19"));
        });
      } else {
        return res.status(500).send(encryptFunc("24"));
      }
    });
  } catch (err) {
    res.status(406).send(encryptFunc("19"));
  }
});

task_router.put("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

task_router.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;

    delete_task(id, (response) => {
      if (response === "19") return res.status(500).send(encryptFunc("19"));
      else if (response) {
        return res.status(200).send(encryptFunc(response));
      } else return res.status(500).send(encryptFunc("19"));
    });
  } catch (err) {
    res.status(406).send(encryptFunc("19"));
  }
});

task_router.delete("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = task_router;
