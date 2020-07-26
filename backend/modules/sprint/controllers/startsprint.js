//  Author: Falgun Patel
//  Banner Id:  B00845029
//  StartSprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var startSprint = (req, res) => {
    if (
        !req.body.hasOwnProperty("sprintID") ||
        !req.body.hasOwnProperty("sprintname") ||
        !req.body.hasOwnProperty("duration") ||
        !req.body.hasOwnProperty("startdate") ||
        !req.body.hasOwnProperty("enddate") ||
        !req.body.hasOwnProperty("description") || 
        !req.body.hasOwnProperty("projectID") 
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- sprintID, sprintname, duration, startdate, enddate, description and projectID` });
    }

    whereSprint = 'WHERE sprintID = ? and projectID = ? and isComplete = ?'
    let sprintStatus = 'SELECT sprintname from Sprints ' + whereSprint
    let sprintID = [req.body.sprintID, req.body.projectID, null]

    let where = 'projectID = ? and sprintID = ?';
    let updateStartSprint = 'UPDATE Sprint SET Sprint.sprintname = ?, Sprint.duration = ?, Sprint.startdate = ?, Sprint.enddate = ?, Sprint.description = ?, Sprint.isComplete = ? ' + where;
    let update_sprint_detail = [req.body.sprintname, req.body.duration, req.body.startdate, req.body.enddate, req.body.description, 0, req.body.projectID, req.body.SprintID];

    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `error while fetching status of sprint sprintID: ${req.body.sprintID}  from database` });
        } else {
            if (result != undefined) {
                connectionObject.query(updateStartSprint, update_sprint_detail, (err, result) => {
                    if (err) {
                        res.status(503).json({ msg: `error while updating sprint details for sprintID: ${req.body.sprintID} in database` });
                    } else {
                        res.status(200).json({ msg: `sprint with sprintID: ${req.body.sprintID} successfully started.` });
                    }
                })
            } else {
                res.status(203).json({ msg: `no uncompleted sprint with sprintID: ${req.body.sprintID} found to start` });
            }
        }
    })
}

module.exports.startSprint = startSprint;