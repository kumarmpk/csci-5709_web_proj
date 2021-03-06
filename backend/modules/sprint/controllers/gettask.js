//  Author: Falgun Patel
//  Banner Id:  B00845029
//  GetTasks API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var getTask = (req, res) => {
  if (!req.body.hasOwnProperty("projectID") || req.body["projectID"] == null) {
    return res
      .status(400)
      .json({ msg: `Please include all mandatory details- projectID` });
  } else if (Number.isInteger(req.body["projectID"]) == false) {
    return res.status(400).json({ msg: `Please enter valid projectID` });
  }

  let getTasks = `SELECT * from Tasks WHERE projectid = '${req.body.projectID}';`;

  connection.invokeQuery(
    getTasks,
    (result) => {
      res.status(200).json({
        msg: `successfully got task details for project with projectID: ${req.body.projectID}`,
        data: JSON.parse(JSON.stringify(result)),
      });
    },
    (err) => {
      if (err) {
        res.status(503).json({
          msg: `error while fetching tasks from project with projectID: ${req.body.projectID} from database`,
        });
      }
    }
  );
};

module.exports.getTask = getTask;
