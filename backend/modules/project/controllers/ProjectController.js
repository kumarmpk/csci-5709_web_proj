//  Author: Meet Patel
//  Banner Id:  B00840009
//  Project Management feature controller

const connection = require("../../../MySQLCon");

function createProject(req, res) {
  const { body } = req;
  if (
    !(
      body.hasOwnProperty("projectName") &&
      body.hasOwnProperty("manager") &&
      body.hasOwnProperty("startDate") &&
      body.hasOwnProperty("endDate")
    )
  ) {
    return res.status(400).json({
      msg:
        "Missing required parameters. Oneof ['name', 'manager', 'startDate', 'endDate']",
    });
  } else {
    let query = `insert into Project(projectName ,startDate, endDate, manager) values
            ('${body.projectName}', '${body.startDate}', 
            '${body.endDate}', '${body.manager}');`;
    connection.invokeQuery(
      query,
      (success) => {
        res.status(201).json({ msg: "Project successfully created" });
      },
      (error) => {
        res.status(500).json({ msg: error });
      }
    );
  }
}

function getProjects(req, res) {
  let query;

  query =
    `SELECT DISTINCT projectID,projectName, manager, endDate, Team.teamName FROM userTeam` +
    ` join projectUserTeam on userTeam.teamID=projectUserTeam.team_ID` +
    ` join Team on userTeam.teamID = Team.teamID` +
    ` join Project on projectUserTeam.project_ID=Project.projectID` +
    ` where userTeam.userID=${req.query.user_id}`;

  console.log("HERE");
  console.log(query);
  console.log("THERE");
  if (req.query.projectName && req.query.projectName !== "") {
    query = query + ` AND projectName LIKE '%${req.query.projectName}%'`;
  } /*else {
        query = 'select * from Project';
    }*/
  connection.invokeQuery(
    query,
    (success) => {
      res.status(200).json(success);
    },
    (error) => {
      res.status(500).json({ msg: error });
    }
  );
}

module.exports.createProject = createProject;
module.exports.getProjects = getProjects;
