/*author :Japnoor Kaur */

const express = require("express");
const teamController = require("../controllers/team-controller");
const router = express.Router();

const { post_team } = require("../controllers/team-controller");

const user = 1;

router.get("/manageteams/:projectId", teamController.getAllTeams);
router.get("/addmember/:teamID", teamController.getAllMembers);
router.get("/addtoteam", teamController.getNotMembers);
router.delete("/deleteteam/:id", teamController.deleteTeam);
router.delete("/deletemember/:tid/:uid", teamController.deleteMember);
router.get("/getteamproject", teamController.getAllProjects);

//post api to add member
router.post("/addtoteam", (req, res) => {
  try {
    let userData = req.body.userName;

    teamController.addNewMember(userData, (response) => {
      return res.status(200).send("Team created successfully!");
    });
  } catch (err) {
    console.log("err", err);
    return res.status(406).send("Team creation failed");
  }
});

//post api to create team
router.post("/createteam", (req, res) => {
  try {
    let userData = req.body.teamName;

    teamController.addNewTeam(userData, (response) => {
      return res.status(200).send("Team created successfully!");
    });
  } catch (err) {
    console.log("err", err);
    return res.status(406).send("Team creation failed");
  }
});

router.put("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

router.delete("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = router;
