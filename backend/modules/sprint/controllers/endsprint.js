//  Author: Falgun Patel
//  Banner Id:  B00845029
//  End Sprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var endSprint = (req, res) => {
  console.log("red", req);
  if (
    !req.body.hasOwnProperty("projectID") ||
    !req.body.hasOwnProperty("sprintID")
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

  let endActiveSprint = `UPDATE Sprints SET isComplete = 1 WHERE sprintID = '${req.body.sprintID}'
                         and projectID = '${req.body.projectID}' and isComplete = 0;`;

  let activeSprintOrder = `SELECT Sprints.order as Sprintorder from Sprints WHERE sprintID = '${req.body.sprintID}'
                             and projectID = '${req.body.projectID}' and isComplete = 0;`;

  let updateTasksSprint = `UPDATE Tasks SET sprintid = null WHERE sprintid = '${req.body.sprintID}'
                           and projectid = '${req.body.projectID}' and status = 1;`;

  var order;

  connection.invokeQuery(
    activeSprintOrder,
    (result) => {
      console.log("*****************", result);
      if (result.length == 0) {
        res.status(400).json({
          msg: `No active sprint found with sprintID: ${req.body.sprintID} and projectID: ${req.body.projectID}`,
        });
      } else {
        order = result[0].Sprintorder + 1;
        console.log("order", order);
        //sprint end
        connection.invokeQuery(
          endActiveSprint,
          (result) => {
            console.log("redddd", result.affectedRows);
            if (result.affectedRows == 1) {
              console.log("backlog");
              //aa sprint na je task baki hoi ae backlog ma nakhe
              connection.invokeQuery(
                updateTasksSprint,
                (result) => {
                  console.log("winwinwin: ", result);

                  res.status(200).json({
                    msg: `successfully ended sprint: ${req.body.sprintID} from project: ${req.body.projectID}`,
                  });
                },
                (err) => {
                  if (err) {
                    console.log("error9", err);
                  }
                }
              );
            }
          },
          (err) => {
            if (err) {
              console.log("error8", err);
            }
          }
        );
      }
    },
    (err) => {
      if (err) {
        console.log("error7", err);
      }
    }
  );
};

module.exports.endSprint = endSprint;
