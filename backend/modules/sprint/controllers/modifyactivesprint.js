//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyActiveSprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

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
    return res.status(400).json({
      msg: `Please include all mandatory details- sprintname, or deescrption, or startdate or enddate and projectID as well as sprintID`,
    });
  } else if (
    Number.isInteger(req.body["projectID"]) == false ||
    Number.isInteger(req.body["sprintID"]) == false ||
    typeof req.body["sprintname"] != "string" ||
    typeof req.body["startdate"] != "string" ||
    typeof req.body["enddate"] != "string"
  ) {
    return res.status(400).json({
      msg: `Please enter valid projectID, sprintID, sprintname, startdate, and enddate`,
    });
  }

  let updateActiveSprint = `UPDATE Sprints SET 
                            sprintname = '${req.body.sprintname}' , startdate = '${req.body.startdate}',
                            enddate = '${req.body.enddate}', description = '${req.body.description}'
                            WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}' and isComplete = 0`;

  connection.invokeQuery(
    updateActiveSprint,
    (result) => {
      console.log("falgun:", result.affectedRows);
      if (result.affectedRows == 0) {
        res.status(500).json({
          msg: `No active sprint found in database with sprintID: ${req.body.sprintID}`,
        });
      } else if (result.affectedRows == 1) {
        res.status(200).json({
          msg: `Active sprint with sprintID: ${req.body.sprintID} successfully modified!`,
        });
      }
    },
    (err) => {
      if (err) {
        console.log("error10", err);
      }
    }
  );
};

module.exports.modifyActiveSprint = modifyActiveSprint;
