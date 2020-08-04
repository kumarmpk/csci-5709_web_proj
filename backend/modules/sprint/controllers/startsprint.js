//  Author: Falgun Patel
//  Banner Id:  B00845029
//  StartSprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

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
        req.body['sprintname'] == '' ||
        req.body['startdate'] == '' ||
        req.body['enddate'] == ''
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- sprintID, sprintname, duration, startdate, enddate, description and projectID` });
    } else if (Number.isInteger(req.body['projectID']) == false || Number.isInteger(req.body['sprintID']) == false || typeof req.body['sprintname'] != "string" || typeof req.body['startdate'] != "string" || typeof req.body['enddate'] != "string") {
        return res
            .status(400)
            .json({ msg: `Please enter valid projectID, sprintID, sprintname, startdate, and enddate` });
    }

    whereSprint = 'WHERE sprintID = ? and projectID = ? and isComplete IS NULL'
    let sprintStatus = 'SELECT sprintname from Sprints ' + whereSprint
    let sprintID = [req.body.sprintID, req.body.projectID]

    let where = 'WHERE Sprints.projectID = ? and Sprints.sprintID = ?';
    let updateStartSprint = 'UPDATE Sprints SET Sprints.sprintname = ?, Sprints.startdate = ?, Sprints.enddate = ?, Sprints.description = ?, Sprints.isComplete = ? ' + where;
    let update_sprint_detail = [req.body.sprintname, req.body.startdate, req.body.enddate, req.body.description, 0, req.body.projectID, req.body.sprintID];
    // console.log(updateStartSprint);
    // console.log(update_sprint_detail);
    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `error while fetching status of sprint sprintID: ${req.body.sprintID}  from database` });
        } else {
            // console.log("select: ", result);
            if (result != undefined) {
                connectionObject.query(updateStartSprint, update_sprint_detail, (err, result) => {
                    // console.log("update:",result);
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