//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyActiveSprint API in Sprint Management and Task modification feature controller

const connectionObject = require("../../../MySQLCon");

var modifyActiveSprint = (req, res) => {
  if (
    !req.body.hasOwnProperty("sprintname") ||
    !req.body.hasOwnProperty("startdate") ||
    !req.body.hasOwnProperty("enddate") ||
    !req.body.hasOwnProperty("description") ||
    !req.body.hasOwnProperty("projectID") ||
    !req.body.hasOwnProperty("sprintID") ||
    req.body["sprintname"] == "" ||
    req.body["startdate"] == "" ||
    req.body["enddate"] == ""
  ) {
    return res
      .status(400)
      .json({
        msg: `Please include all mandatory details- sprintname, or deescrption, or startdate or enddate and projectID as well as sprintID`,
      });
  } else if (
    Number.isInteger(req.body["projectID"]) == false ||
    Number.isInteger(req.body["sprintID"]) == false ||
    typeof req.body["sprintname"] != "string" ||
    typeof req.body["startdate"] != "string" ||
    typeof req.body["enddate"] != "string"
  ) {
    return res
      .status(400)
      .json({
        msg: `Please enter valid projectID, sprintID, sprintname, startdate, and enddate`,
      });
  }

  let whereSprintID = "WHERE sprintID = ? and projectID = ? and isComplete = ?";
  let updateActiveSprint =
    "UPDATE Sprints SET sprintname = ? , startdate = ?, enddate = ?, description = ? " +
    whereSprintID;
  let sprint_details = [
    req.body.sprintname,
    req.body.startdate,
    req.body.enddate,
    req.body.description,
    req.body.sprintID,
    req.body.projectID,
    0,
  ];

  connectionObject.query(updateActiveSprint, sprint_details, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    console.log("falgun:", result.affectedRows);
    if (result.affectedRows == 0) {
      res
        .status(500)
        .json({
          msg: `No active sprint found in database with sprintID: ${req.body.sprintID}`,
        });
    } else if (result.affectedRows == 1) {
      res
        .status(200)
        .json({
          msg: `Active sprint with sprintID: ${req.body.sprintID} successfully modified!`,
        });
    }
  });
};

module.exports.modifyActiveSprint = modifyActiveSprint;
