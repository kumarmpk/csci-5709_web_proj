//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifySprint API in Sprint Management and Task modification feature controller

const connectionObject = require("../../../MySQLCon");

var modifySprint = (req, res) => {
  console.log("req", req.body);
  if (
    (!req.body.hasOwnProperty("sprintname") &&
      !req.body.hasOwnProperty("description")) ||
    !req.body.hasOwnProperty("projectID") ||
    !req.body.hasOwnProperty("sprintID") ||
    req.body["sprintname"] == ""
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details- sprintname, or deescrption and projectID as well as sprintID`,
    });
  } else if (
    Number.isInteger(req.body["projectID"]) == false ||
    Number.isInteger(req.body["sprintID"]) == false ||
    typeof req.body["sprintname"] != "string"
  ) {
    return res
      .status(400)
      .json({ msg: `Please enter valid projectID, sprintID, and sprintname` });
  }

  let whereSprintID =
    "WHERE sprintID = ? and projectID = ? and isComplete IS NULL";
  // let whereProjectID = '&& projectID = ?'
  let updateSprintName = "UPDATE Sprints SET sprintname = ? " + whereSprintID;
  let updateSprintDesc = "UPDATE Sprints SET description = ? " + whereSprintID;
  let sprint_name = [
    req.body.sprintname,
    req.body.sprintID,
    req.body.projectID,
    null,
  ];
  let description = [
    req.body.description,
    req.body.sprintID,
    req.body.projectID,
    null,
  ];
  // let projectID = [req.body.projectID];
  // let sprintID = [req.body.projectID];

  let descUpdated = false;

  if (req.body.sprintname) {
    connectionObject.query(updateSprintName, sprint_name, (err, result) => {
      if (err) {
        console.log("error", err);
      }
      console.log("dta", result.affectedRows);
      if (result.affectedRows == 0) {
        res.status(500).json({
          msg: `No sprint found in database with sprintID: ${req.body.sprintID}`,
        });
      } else if (result.affectedRows == 1) {
        //modifing description of sprint
        if (req.body.description) {
          descUpdated = true;
          connectionObject.query(
            updateSprintDesc,
            description,
            (err, result) => {
              if (err) {
                console.log("error", err);
              }
              if (result.affectedRows == 0) {
                res.status(500).json({
                  msg: `No sprint found in database with with sprintID: ${req.body.sprintID}`,
                });
              } else if (result.affectedRows == 1) {
                res.status(200).json({
                  msg: `name and description for ${req.body.sprintID} successfully modified`,
                });
              }
            }
          );
        } else {
          res.status(200).json({
            msg: `new name ${req.body.sprintname} is modified for sprint with sprintID: ${req.body.sprintID}`,
          });
        }
      }
    });
  } else if (req.body.description && descUpdated == false) {
    connectionObject.query(updateSprintDesc, descripton, (err, result) => {
      if (err) {
        console.log("error", err);
      }
      if (result.affectedRows == 0) {
        res.status(500).json({
          msg: `No sprint found in database with with sprintID: ${req.body.sprintID}`,
        });
      } else if (result.affectedRows == 1) {
        res.status(200).json({
          msg: `description for ${req.body.sprintname} successfully modified`,
        });
      }
    });
  }
};

module.exports.modifySprint = modifySprint;
