//  Author: Falgun Patel
//  Banner Id:  B00845029
//  DeleteSprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var deletesprint = (req, res) => {
  //change sprintID = null
  console.log("########################", req.body);
  if (
    !req.body.hasOwnProperty("sprintID") ||
    !req.body.hasOwnProperty("projectID")
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details such as  sprintID and projectID`,
    });
  } else if (
    Number.isInteger(req.body["projectID"]) == false ||
    Number.isInteger(req.body["sprintID"]) == false
  ) {
    return res
      .status(400)
      .json({ msg: `Please enter valid projectID and sprintID` });
  }

  var Tasks = [];
  let updateTasksSprint = `UPDATE Tasks SET sprintid = null WHERE 
                            sprintid = '${req.body.sprintID}' and projectid = '${req.body.projectID}';`;

  let recoveryUpdateTasksSprint = `UPDATE Tasks SET sprintid = '${req.body.sprintID}'
                                     WHERE taskid in ${Tasks} and projectid = '${req.body.projectID}';`;

  let getTasksSprint = `SELECT taskid from Tasks WHERE sprintid = '${req.body.sprintID}'
                             and projectid = '${req.body.projectID}';`;

  let deleteSprint = `DELETE FROM Sprints WHERE sprintID = '${req.body.sprintID}' 
                        and projectID = '${req.body.projectID}';`;

  //taskID read karavine store karavano
  connection.invokeQuery(
    getTasksSprint,
    (result) => {
      console.log("ress", result);
      if (result.length != 0) {
        console.log("result: ", result);
        result.forEach((element) => {
          Tasks.push(element.taskid);
        });

        connection.invokeQuery(
          updateTasksSprint,
          (result) => {
            console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ", result);
            connection.invokeQuery(
              deleteSprint,
              (result) => {
                res.status(200).json({
                  msg: `Sprint with ${req.body.sprintID} is successfully deleted!`,
                });
              },
              (err) => {
                if (err) {
                  connection.invokeQuery(
                    recoveryUpdateTasksSprint,
                    (result) => {
                      res.status(503).json({
                        msg: `Error while deleting sprint in database for sprint: ${req.body.sprintID}`,
                      });
                    },
                    (err) => {
                      if (err) {
                        res.status(503).json({
                          msg: `Database goes into inconsistent state for Tasks of sprint: ${req.body.sprintID}`,
                        });
                      }
                    }
                  );
                }
              }
            );
          },
          (err) => {
            if (err) {
              res.status(503).json({
                msg: `Error while updating tasks for sprint: ${req.body.sprintID} in database `,
              });
            }
          }
        );
      } else {
        //direct sprint delete
        connection.invokeQuery(
          deleteSprint,
          (result) => {
            res.status(200).json({
              msg: `Sprint with ${req.body.sprintID} is successfully deleted!`,
            });
          },
          (err) => {
            if (err) {
              res.status(503).json({
                msg: `Error while deleting sprint in database for sprint: ${req.body.sprintID}`,
              });
            }
          }
        );
      }
    },
    (err) => {
      if (err) {
        res.status(503).json({
          msg: `Error while getting tasks in database for sprint: ${req.body.sprintID}`,
        });
      }
    }
  );
};

module.exports.deleteSprint = deletesprint;
