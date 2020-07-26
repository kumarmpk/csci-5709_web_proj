//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyTaskStatus API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var modifyTaskStatus = (req, res) => {
    if (
        !req.body.hasOwnProperty("sprintID") ||
        !req.body.hasOwnProperty("taskID") ||
        !req.body.hasOwnProperty("projectID") ||
        !req.body.hasOwnProperty("newStatus")
        
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- sprintID, taskID, projectID, and newStatus` });
    }

    whereSprint = 'WHERE sprintID = ? and projectID = ?'
    let sprintStatus = 'SELECT Sprints.isComplete as status from Sprints ' + whereSprint
    let sprintID = [req.body.newSprintID, req.body.projectID]

    let where = 'taskid = ? and projectid = ? and sprintid = ?';
    let updateTaskStatus = 'UPDATE Tasks SET Tasks.status = ? ' + where;
    let update_task_detail = [req.body.newStatus, req.body.taskID, req.body.projectID, req.body.SprintID];

    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `error while fetching status of sprint sprintID: ${req.body.sprintID}  from database` });
        } else {
            if (result[0].status == 0) {
                connectionObject.query(updateTaskStatus, update_task_detail, (err, result) => {
                    if (err) {
                        res.status(503).json({ msg: `error while updating sprint of task taskID: ${req.body.taskID}  from database` });
                    } else {
                        res.status(200).json({ msg: `status of task with taskID: ${req.body.taskID} successfully updated in database` });
                    }
                })
            } else {
                res.status(203).json({ msg: `Cannot change status of task with taskID: ${req.body.taskID} for sprint other than active sprit` });
            }
        }
    })
}

module.exports.modifyTaskStatus = modifyTaskStatus;