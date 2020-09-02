//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyTaskStatus API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var modifyTaskStatus = (req, res) => {
  // console.log('req',req.body);
  if (
    !req.body.hasOwnProperty("sprintID") ||
    !req.body.hasOwnProperty("taskID") ||
    !req.body.hasOwnProperty("projectID") ||
    !req.body.hasOwnProperty("newStatus") ||
    req.body["sprintID"] == null ||
    req.body["taskID"] == null ||
    req.body["projectID"] == null
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details- sprintID, taskID, projectID, and newStatus`,
    });
  } else if (
    typeof req.body["newStatus"] == "string" ||
    Number.isInteger(req.body["sprintID"]) == false ||
    Number.isInteger(req.body["taskID"]) == false ||
    Number.isInteger(req.body["projectID"]) == false
  ) {
    return res.status(400).json({
      msg: `Please enter valid newStatus, sprintID, taskID, and projectID`,
    });
  }

  let sprintStatus = `SELECT Sprints.isComplete as status from Sprints 
                        WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}';`;

  let updateTaskStatus = `UPDATE Tasks SET Tasks.status = '${req.body.newStatus}' 
                            WHERE taskid = '${req.body.taskID}' and projectid = '${req.body.projectID}'
                            and sprintid = '${req.body.sprintID}';`;

  connection.invokeQuery(
    sprintStatus,
    (result1) => {
      result1.forEach((element) => {
        if (element["status"] != null) {
          element["status"] = element["status"][0];
        }
      });
      if (result1[0].status == 0) {
        connection.invokeQuery(
          updateTaskStatus,
          (result2) => {
            res.status(200).json({
              msg: `status of task with taskID: ${req.body.taskID} successfully updated in database`,
            });
          },
          (err2) => {
            if (err2) {
              res.status(503).json({
                msg: `error while updating sprint of task with taskID: ${req.body.taskID}  from database`,
              });
            }
          }
        );
      } else {
        res.status(203).json({
          msg: `Cannot change status of task with taskID: ${req.body.taskID} for sprint other than active sprit`,
        });
      }
    },
    (err1) => {
      if (err1) {
        res.status(503).json({
          msg: `error while fetching status of sprint sprintID: ${req.body.sprintID}  from database`,
        });
      }
    }
  );
};

module.exports.modifyTaskStatus = modifyTaskStatus;
