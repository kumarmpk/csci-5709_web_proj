//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifySprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

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

  let updateSprintName = `UPDATE Sprints SET sprintname = '${req.body.sprintname}'
                          WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}'
                          and isComplete IS null;`;

  let updateSprintDesc = `UPDATE Sprints SET description = '${req.body.description}'
                          WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}'
                          and isComplete IS null;`;

  let descUpdated = false;

  if (req.body.sprintname) {
    connection.invokeQuery(
      updateSprintName,
      (result1) => {
        console.log("dta", result1.affectedRows);
        if (result1.affectedRows == 0) {
          res.status(500).json({
            msg: `No sprint found in database with sprintID: ${req.body.sprintID}`,
          });
        } else if (result1.affectedRows == 1) {
          //modifing description of sprint
          if (req.body.description) {
            descUpdated = true;
            connection.invokeQuery(
              updateSprintDesc,
              (result2) => {
                if (result2.affectedRows == 0) {
                  res.status(500).json({
                    msg: `No sprint found in database with with sprintID: ${req.body.sprintID}`,
                  });
                } else if (result2.affectedRows == 1) {
                  res.status(200).json({
                    msg: `name and description for ${req.body.sprintID} successfully modified`,
                  });
                }
              },
              (err2) => {
                if (err2) {
                  console.log("error12", err);
                }
              }
            );
          } else {
            res.status(200).json({
              msg: `new name ${req.body.sprintname} is modified for sprint with sprintID: ${req.body.sprintID}`,
            });
          }
        }
      },
      (err1) => {
        if (err1) {
          console.log("error11", err);
        }
      }
    );
  } else if (req.body.description && descUpdated == false) {
    connection.invokeQuery(
      updateSprintDesc,
      (result) => {
        if (result.affectedRows == 0) {
          res.status(500).json({
            msg: `No sprint found in database with with sprintID: ${req.body.sprintID}`,
          });
        } else if (result.affectedRows == 1) {
          res.status(200).json({
            msg: `description for ${req.body.sprintname} successfully modified`,
          });
        }
      },
      (err) => {
        if (err) {
          console.log("error13", err);
        }
      }
    );
  }
};

module.exports.modifySprint = modifySprint;
