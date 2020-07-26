//  Author: Falgun Patel
//  Banner Id:  B00845029
//  GetUncompletedSprints API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon');

var getNotCompletedSprint = (req, res) => {
    if (
        !req.body.hasOwnProperty("projectID")
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- projectID` });
    }

    whereSprint = 'WHERE projectID = ? and isComplete is ? or isComplete = ?'
    let sprintStatus = 'SELECT * from Sprints ' + whereSprint
    let sprintID = [req.body.projectID, null, 0]

    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `error while fetching sprint details of project with projectID: ${req.body.projectID} from database` });
        } else {
            console.log('');
            res.status(200).json({ msg: `successfully got sprint details for project with projectID: ${req.body.projectID}` 
        , data: JSON.parse(JSON.stringify(result))});
        }
    })
}

module.exports.getNotCompletedSprint = getNotCompletedSprint;