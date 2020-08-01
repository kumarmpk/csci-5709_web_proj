//  Author: Falgun Patel
//  Banner Id:  B00845029
//  Router for Sprint Management and Task modification feature controller

const express = require("express");
const sprint_router = express.Router();
const { createSprint } = require("../../sprint/controllers/createsprint");
const { deleteSprint } = require("../controllers/deletesprint");
const { endSprint } = require("../controllers/endsprint");
const { getNotCompletedSprint } = require("../controllers/getremainsprint");
const { getTask } = require("../controllers/gettask");
const { modifyActiveSprint } = require("../../sprint/controllers/modifyactivesprint");
const { modifyOrder } = require("../controllers/modifyorder");
const { modifySprint } = require("../../sprint/controllers/modifysprint");
const { modifyTaskSprint } = require("../../sprint/controllers/modifytasksprint");
const { modifyTaskStatus } = require("../../sprint/controllers/modifytaskstatus");
const { startSprint } = require("../controllers/startsprint");








sprint_router.get("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

sprint_router.post("/create", createSprint);
sprint_router.delete("/delete", deleteSprint);
sprint_router.put("/endSprint", endSprint);
sprint_router.post("/getSprint", getNotCompletedSprint);
sprint_router.post("/gettask", getTask);
sprint_router.put("/modifyActive", modifyActiveSprint);
sprint_router.put("/modifyOrder", modifyOrder);
sprint_router.put("/modifySprint", modifySprint);
sprint_router.put("/modifyTaskSprint", modifyTaskSprint);
sprint_router.put("/modifyTaskStatus", modifyTaskStatus);
sprint_router.post("/startSprint", startSprint);









sprint_router.post("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

sprint_router.put("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

sprint_router.delete("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = sprint_router;
