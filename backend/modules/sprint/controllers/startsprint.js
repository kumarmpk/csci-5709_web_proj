//  Author: Falgun Patel
//  Banner Id:  B00845029
//  StartSprint API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var startSprint = (req, res) => {
  // console.log('reww', req.body);
  if (
    !req.body.hasOwnProperty("sprintID") ||
    !req.body.hasOwnProperty("sprintname") ||
    !req.body.hasOwnProperty("duration") ||
    !req.body.hasOwnProperty("startdate") ||
    !req.body.hasOwnProperty("enddate") ||
    !req.body.hasOwnProperty("description") ||
    !req.body.hasOwnProperty("projectID") ||
    req.body["sprintname"] == "" ||
    req.body["startdate"] == "" ||
    req.body["enddate"] == ""
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details- sprintID, sprintname, duration, startdate, enddate, description and projectID`,
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

  let sprintStatus = `SELECT sprintname from Sprints 
                    WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}'
                    and isComplete IS NULL`;

  let updateStartSprint = `UPDATE Sprints SET Sprints.sprintname = '${req.body.sprintname}',
                            Sprints.startdate = '${req.body.startdate}', Sprints.enddate = '${req.body.enddate}', 
                            Sprints.description = '${req.body.description}', Sprints.isComplete = '0'
                            WHERE Sprints.projectID = '${req.body.projectID}' and Sprints.sprintID = '${req.body.sprintID}';`;

  connection.invokeQuery(
    sprintStatus,
    (result1) => {
      if (result1 != undefined) {
        connection.invokeQuery(
          updateStartSprint,
          (result2) => {
            res.status(200).json({
              msg: `sprint with sprintID: ${req.body.sprintID} successfully started.`,
            });
          },
          (err2) => {
            if (err2) {
              res.status(503).json({
                msg: `error while updating sprint details for sprintID: ${req.body.sprintID} in database`,
              });
            }
          }
        );
      } else {
        res.status(203).json({
          msg: `no uncompleted sprint with sprintID: ${req.body.sprintID} found to start`,
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

module.exports.startSprint = startSprint;
