/*author :Japnoor Kaur */
const connection = require("../../../MySQLCon");
var tid;
var tname;

//controller method to get all teams in a project
exports.getAllTeams = (req, res) => {
  tid = req.params.projectId;
  let sql = `Select teamName, teamID from Team where teamID IN (Select team_ID from projectUserTeam where project_ID= '${req.params.projectId}')`;
  connection.invokeQuery(
    sql,
    (result) => {
      res.status(200).json(result);
      console.log("get all teams executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to get all users who are not the team members
exports.getNotMembers = (req, res) => {
  tid = req.params.projectId;

  let sql2 = `Select userName from User where userID NOT IN (Select userID from userTeam where teamID = '${tname}');`;
  connection.invokeQuery(
    sql2,
    (result) => {
      res.status(200).json(result);
      console.log("get all not members executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

exports.addNewMember2 = (req, res) => {
  tid = req.params.projectId;

  let sql2 = `Select userName from User where userID NOT IN (Select userID from userTeam where teamID IN (Select teamID from Team where teamName = '${tname}'));`;
  connection.invokeQuery(
    sql2,
    (result) => {
      res.status(200).json(result);
      console.log("get all not members executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//methos to delete a member from team
exports.deleteMember = (req, res) => {
  let sql2 = `Delete from userTeam where userID='${req.params.uid}' && teamID='${req.params.tid}';`;
  connection.invokeQuery(
    sql2,
    (result) => {
      res.status(200).json("1 Member deleted");
      console.log("1 Member deleted");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to get all members of the team
exports.getAllMembers = (req, res) => {
  tname = req.params.teamID;

  let sql = `Select userName, userID from User where userID IN (Select userID from userTeam where teamID = '${req.params.teamID}');`;
  connection.invokeQuery(
    sql,
    (result) => {
      res.status(200).json(result);
      console.log("get all members executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to get all members of the team
exports.getAllProjects = (req, res) => {
  if (req.params.uId == "2") {
    let sql = `Select projectName, projectID from Project;`;
    connection.invokeQuery(
      sql,
      (result) => {
        res.status(200).json(result);
        console.log("get all projects executed for admin");
      },
      (err) => {
        if (err) {
          console.log("error occured");
          console.log("Error ", err);
        }
      }
    );
  } else {
    let sql = `Select projectName, projectID from Project where projectID IN (Select project_ID from projectUserTeam where team_ID IN (Select teamID from userTeam where userID='${req.params.uId}'));`;
    connection.invokeQuery(
      sql,
      (result) => {
        res.status(200).json(result);
        console.log("get all projects executed");
      },
      (err) => {
        if (err) {
          console.log("error occured");
          console.log("Error ", err);
        }
      }
    );
  }
};

//method to create a new team
exports.addNewTeam = (userData, res) => {
  let sql = `INSERT INTO Team (teamName) VALUES ('${userData}'); `;
  connection.invokeQuery(
    sql,
    (result1) => {
      let sql2 = `Select teamID from Team where teamName= '${userData}'; `;
      connection.invokeQuery(
        sql2,
        (result2) => {
          var string = JSON.stringify(result2);
          var json = JSON.parse(string);

          let sql3 = `INSERT INTO projectUserTeam (project_ID, team_ID) VALUES ('${tid}','${json[0].teamID}');`;
          connection.invokeQuery(
            sql3,
            (result3) => {
              console.log("Team created successfully");
            },
            (err3) => {
              if (err3) {
                console.log("error occured");
                console.log("Error ", err3);
              }
            }
          );
        },
        (err2) => {
          if (err2) {
            console.log("error occured");
            console.log("Error ", err2);
          }
        }
      );
    },
    (err1) => {
      if (err1) {
        console.log("error occured");
        console.log("Error ", err1);
      }
    }
  );
};

//method to add a new team member
exports.addNewMember = (userData, res) => {
  let sql = `Insert into userTeam (userID, teamID) values ((Select userID from User where userName='${userData}' LIMIT 1),('${tname}'));`;

  connection.invokeQuery(
    sql,
    (result) => {
      console.log(" 1 Member added successfully");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to delete a team
exports.deleteTeam = (req, res) => {
  let sql = `Delete from userTeam where teamID='${req.params.id}';`;

  connection.invokeQuery(
    sql,
    (result1) => {
      console.log(result1);
      let sql2 = `Delete from projectUserTeam where team_ID='${req.params.id}';`;
      connection.invokeQuery(
        sql2,
        (result2) => {
          console.log(result2);
          let sql3 = `Delete from Team where teamID='${req.params.id}';`;
          connection.invokeQuery(
            sql3,
            (result3) => {
              return res.status(200).send("Team Deleted successfully");
            },
            (err3) => {
              if (err3) {
                console.log("error occured");
                console.log("Error ", err3);
              }
            }
          );
        },
        (err2) => {
          if (err2) {
            console.log("error occured");
            console.log("Error ", err2);
          }
        }
      );
    },
    (err1) => {
      if (err1) {
        console.log("error occured");
        console.log("Error ", err1);
      }
    }
  );
};

//method to get team id
getteamid = (userData, res) => {
  let sql = `Select teamID from Team where teamname = '${userData}';`;
  connection.invokeQuery(
    sql,
    (result) => {
      res.json(result);
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};
