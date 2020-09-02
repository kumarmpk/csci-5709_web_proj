//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyTasksSprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var modifyTaskSprint = (req, res) => {
  // console.log("req", req.body);
  if (
    !req.body.hasOwnProperty("newSprintID") ||
    !req.body.hasOwnProperty("taskID") ||
    !req.body.hasOwnProperty("projectID") ||
    req.body["projectID"] == null ||
    req.body["taskID"] == null
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details- newSprintID, taskID, and projectID`,
    });
  } else if (
    typeof req.body["newSprintID"] == "string" ||
    Number.isInteger(req.body["taskID"]) == false ||
    Number.isInteger(req.body["projectID"]) == false
  ) {
    return res
      .status(400)
      .json({ msg: `Please enter valid newSprintID, taskID, and projectID` });
  }

  let newSprintStatus = `SELECT Sprints.isComplete as status from Sprints 
                            WHERE sprintID = '${req.body.newSprintID}';`;

  let updateTaskSprintID = `UPDATE Tasks SET Tasks.sprintid = '${req.body.newSprintID}'
                            WHERE taskid = '${req.body.taskID}' and projectid = '${req.body.projectID}';`;

  if (req.body.newSprintID != null) {
    connection.invokeQuery(
      newSprintStatus,
      (result1) => {
        result1.forEach((element) => {
          if (element["status"] != null) {
            element["status"] = element["status"][0];
          }
        });
        if (result1[0].status != 1) {
          connection.invokeQuery(
            updateTaskSprintID,
            (result2) => {
              res.status(200).json({
                msg: `task with taskID: ${req.body.taskID} successfully moved to new sprint with sprintID: ${req.body.newSprintID}`,
              });
            },
            (err2) => {
              if (err2) {
                res.status(503).json({
                  msg: `error while updating sprint of task taskID: ${req.body.taskID}  from database`,
                });
              }
            }
          );
        } else {
          res.status(203).json({
            msg: `Cannot move task with taskID: ${req.body.taskID} to already ended sprint`,
          });
        }
      },
      (err1) => {
        if (err1) {
          res.status(503).json({
            msg: `error while fetching status of sprint sprintID: ${req.body.newSprintID}  from database`,
          });
        }
      }
    );
  } else {
    connection.invokeQuery(
      updateTaskSprintID,
      (result) => {
        res.status(200).json({
          msg: `task with taskID: ${req.body.taskID} successfully moved to backlog`,
        });
      },
      (err) => {
        if (err) {
          res.status(503).json({
            msg: `error from database while moving task with taskID: ${req.body.taskID} to backlog`,
          });
        }
      }
    );
  }
};

module.exports.modifyTaskSprint = modifyTaskSprint;
