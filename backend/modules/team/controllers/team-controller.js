/*author :Japnoor Kaur */

const mysql = require("mysql");
const config = require("../../../config");
var tid;
var tname;

let connect = mysql.createConnection({
  host: config.mySQLConfig.host,
  user: config.mySQLConfig.user,
  password: config.mySQLConfig.password,
  port: config.mySQLConfig.port,
});

//creating DB connection
let query = "use " + config.mySQLConfig.database;

connect.connect(function (error) {
  if (error) {
    console.log("Error ", error);
  }
  connect.query(query, function (error, result) {
    if (error) {
      console.log("Error ", error);
    }
    console.log("DB is connected");
  });
});

//controller method to get all teams in a project
exports.getAllTeams = (req, res) => {
  tid = req.params.projectId;
  let sql = `Select teamName, teamID from Team where teamID IN (Select team_ID from projectUserTeam where project_ID= '${req.params.projectId}')`;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.status(200).json(result);
    console.log("get all teams executed");
  });
};

//method to get all users who are not the team members
exports.getNotMembers = (req, res) => {
  tid = req.params.projectId;

  let sql2 = `Select userName from User where userID NOT IN (Select userID from userTeam where teamID = '${tname}');`;
  let sqlquery2 = connect.query(sql2, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.status(200).json(result);

    console.log("get all not members executed");
  });
};

exports.addNewMember2 = (req, res) => {
  tid = req.params.projectId;

  let sql2 = `Select userName from User where userID NOT IN (Select userID from userTeam where teamID IN (Select teamID from Team where teamName = '${tname}'));`;
  let sqlquery2 = connect.query(sql2, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.status(200).json(result);

    console.log("get all not members executed");
  });
};

//methos to delete a member from team
exports.deleteMember = (req, res) => {
  let sql2 = `Delete from userTeam where userID='${req.params.uid}' && teamID='${req.params.tid}';`;
  let sqlquery2 = connect.query(sql2, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.status(200).json("1 Member deleted");

    console.log("1 Member deleted");
  });
};

//method to get all members of the team
exports.getAllMembers = (req, res) => {
  tname = req.params.teamID;

  let sql = `Select userName, userID from User where userID IN (Select userID from userTeam where teamID = '${req.params.teamID}');`;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.status(200).json(result);

    console.log("get all members executed");
  });
};

//method to get all members of the team
exports.getAllProjects = (req, res) => {
  //tname = req.params.teamID;
  if (req.params.uId == "2") {
    let sql = `Select projectName, projectID from Project;`;
    //let sql = `Select projectName, projectID from Project;`;
    let sqlquery = connect.query(sql, (err, result) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
      res.status(200).json(result);

      console.log("get all projects executed for admin");
    });
  } else {
    let sql = `Select projectName, projectID from Project where projectID IN (Select project_ID from projectUserTeam where team_ID IN (Select teamID from userTeam where userID='${req.params.uId}'));`;

    // let sql = `Select projectName, projectID from Project;`;
    let sqlquery = connect.query(sql, (err, result) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
      res.status(200).json(result);

      console.log("get all projects executed");
    });
  }
};

//method to create a new team
exports.addNewTeam = (userData, res) => {
  let sql = `INSERT INTO Team (teamName) VALUES ('${userData}'); `;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    let sql2 = `Select teamID from Team where teamName= '${userData}'; `;
    let sqlquery2 = connect.query(sql2, (err, result) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }

      var string = JSON.stringify(result);
      var json = JSON.parse(string);

      let sql3 = `INSERT INTO projectUserTeam (project_ID, team_ID) VALUES ('${tid}','${json[0].teamID}');`;
      let sqlquery3 = connect.query(sql3, (err, result) => {
        if (err) {
          console.log("error occured");
          console.log("Error ", err);
        }

        console.log("Team created successfully");
      });
    });
  });
};

//method to add a new team member
exports.addNewMember = (userData, res) => {
  let sql = `Insert into userTeam (userID, teamID) values ((Select userID from User where userName='${userData}' LIMIT 1),('${tname}'));`;

  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    console.log(" 1 Member added successfully");
  });
};

//method to delete a team
exports.deleteTeam = (req, res) => {
  let sql = `Delete from userTeam where teamID='${req.params.id}';`;

  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
  });
  let sql2 = `Delete from projectUserTeam where team_ID='${req.params.id}';`;

  let sqlquery2 = connect.query(sql2, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
  });
  let sql3 = `Delete from Team where teamID='${req.params.id}';`;

  let sqlquery3 = connect.query(sql3, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    return res.status(200).send("Team Deleted successfully");
  });
};

//method to get team id
getteamid = (userData, res) => {
  let sql = `Select teamID from Team where teamname = '${userData}';`;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      console.log("Error ", err);
    }
    res.json(result);
  });
};
