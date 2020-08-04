//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyTaskStatus API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var modifyTaskStatus = (req, res) => {
    // console.log('req',req.body);
    if (
        !req.body.hasOwnProperty("sprintID") ||
        !req.body.hasOwnProperty("taskID") ||
        !req.body.hasOwnProperty("projectID") ||
        !req.body.hasOwnProperty("newStatus") || req.body['sprintID'] == null || req.body['taskID'] == null || req.body['projectID'] == null
        
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- sprintID, taskID, projectID, and newStatus` });
    } else if ((typeof req.body['newStatus'] == "string") || Number.isInteger(req.body['sprintID']) == false || Number.isInteger(req.body['taskID']) == false || Number.isInteger(req.body['projectID']) == false) {
        return res
            .status(400)
            .json({ msg: `Please enter valid newStatus, sprintID, taskID, and projectID` });
    }


    whereSprint = 'WHERE sprintID = ? and projectID = ?'
    let sprintStatus = 'SELECT Sprints.isComplete as status from Sprints ' + whereSprint
    let sprintID = [req.body.sprintID, req.body.projectID]

    let where = 'WHERE taskid = ? and projectid = ? and sprintid = ?';
    let updateTaskStatus = 'UPDATE Tasks SET Tasks.status = ? ' + where;
    let update_task_detail = [req.body.newStatus, req.body.taskID, req.body.projectID, req.body.sprintID];

    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `error while fetching status of sprint sprintID: ${req.body.sprintID}  from database` });
        } else {
            // console.log(result);
            result.forEach(element => {
                if (element['status'] != null) {
                    element['status'] = element['status'][0]
                }
            });
            if (result[0].status == 0) {
                connectionObject.query(updateTaskStatus, update_task_detail, (err, result) => {
                    // console.log('res', result.message);
                    if (err) {
                        res.status(503).json({ msg: `error while updating sprint of task with taskID: ${req.body.taskID}  from database` });
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