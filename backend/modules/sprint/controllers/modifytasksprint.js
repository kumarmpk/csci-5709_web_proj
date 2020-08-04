//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyTasksSprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var modifyTaskSprint = (req, res) => {
    // console.log("req", req.body);
    if (
        !req.body.hasOwnProperty("newSprintID") ||
        !req.body.hasOwnProperty("taskID") ||
        !req.body.hasOwnProperty("projectID") || req.body['projectID'] == null || req.body['taskID'] == null
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- newSprintID, taskID, and projectID` });
    } else if ((typeof req.body['newSprintID'] == "string") || Number.isInteger(req.body['taskID']) == false || Number.isInteger(req.body['projectID']) == false) {
        return res
            .status(400)
            .json({ msg: `Please enter valid newSprintID, taskID, and projectID` });
    }

    whereNewSprint = 'WHERE sprintID = ?'
    let newSprintStatus = 'SELECT Sprints.isComplete as status from Sprints ' + whereNewSprint
    let newSprintID = [req.body.newSprintID]

    let where = 'WHERE taskid = ? and projectid = ?';
    let updateTaskSprintID = 'UPDATE Tasks SET Tasks.sprintid = ? ' + where;
    let update_task_detail = [req.body.newSprintID, req.body.taskID, req.body.projectID];
    var order;

    if (req.body.newSprintID != null) {

        connectionObject.query(newSprintStatus, newSprintID, (err, result) => {
            if (err) {
                res.status(503).json({ msg: `error while fetching status of sprint sprintID: ${req.body.newSprintID}  from database` });
            } else {
                result.forEach(element => {
                    if (element['status'] != null) {
                        element['status'] = element['status'][0]
                    }
                });
                if (result[0].status != 1) {
                    connectionObject.query(updateTaskSprintID, update_task_detail, (err, result) => {
                        if (err) {
                            res.status(503).json({ msg: `error while updating sprint of task taskID: ${req.body.taskID}  from database` });
                        } else {
                            res.status(200).json({ msg: `task with taskID: ${req.body.taskID} successfully moved to new sprint with sprintID: ${req.body.newSprintID}` });
                        }
                    })
                } else {
                    //nai thay speint completed
                    res.status(203).json({ msg: `Cannot move task with taskID: ${req.body.taskID} to already ended sprint` });
                }
            }
        })
    } else {
        connectionObject.query(updateTaskSprintID, update_task_detail, (err, result) => {
            if (err) {
                res.status(503).json({ msg: `error from database while moving task with taskID: ${req.body.taskID} to backlog` });
            } else {
                res.status(200).json({ msg: `task with taskID: ${req.body.taskID} successfully moved to backlog` });
            }
        })
    }
}

module.exports.modifyTaskSprint = modifyTaskSprint;