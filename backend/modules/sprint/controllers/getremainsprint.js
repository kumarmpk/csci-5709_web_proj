//  Author: Falgun Patel
//  Banner Id:  B00845029
//  GetUncompletedSprints API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var getNotCompletedSprint = (req, res) => {
  if (!req.body.hasOwnProperty("projectID") || req.body["projectID"] == null) {
    return res
      .status(400)
      .json({ msg: `Please include all mandatory details- projectID` });
  } else if (Number.isInteger(req.body["projectID"]) == false) {
    return res.status(400).json({ msg: `Please enter valid projectID` });
  }

  let sprintStatus = `SELECT * from Sprints WHERE projectID = '${req.body.projectID}'
                       and (isComplete is null or isComplete = 0)`;

  connection.invokeQuery(
    sprintStatus,
    (result) => {
      result.forEach((element) => {
        if (element["isComplete"] != null) {
          element["isComplete"] = element["isComplete"][0];
        }
      });
      res.status(200).json({
        msg: `successfully got sprint details for project with projectID: ${req.body.projectID}`,
        data: JSON.parse(JSON.stringify(result)),
      });
    },
    (err) => {
      if (err) {
        res.status(503).json({
          msg: `error while fetching sprint details of project with projectID: ${req.body.projectID} from database`,
        });
      }
    }
  );
};

module.exports.getNotCompletedSprint = getNotCompletedSprint;
