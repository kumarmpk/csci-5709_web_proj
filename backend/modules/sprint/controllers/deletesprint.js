//  Author: Falgun Patel
//  Banner Id:  B00845029
//  DeleteSprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var deletesprint = (req, res) => {
    //change sprintID = null
    if (!req.body.hasOwnProperty("sprintID") || !req.body.hasOwnProperty("projectID")) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details such as  sprintID and projectID` });
    }

    let whereSprintDelete = 'WHERE sprintID = ? and projectID = ?'
    let whereTaskUpdate = 'WHERE sprintid = ? and projectid = ?'
    let whereRecoveryTaskUpdate = 'WHERE taskid in ? and projectid = ?'
    let updateTasksSprint = 'UPDATE Tasks SET sprintid = ? ' + whereTaskUpdate
    let recoveryUpdateTasksSprint = 'UPDATE Tasks SET sprintid = ? '+ whereRecoveryTaskUpdate
    let getTasksSprint = 'SELECT taskid from Tasks ' + whereTaskUpdate
    let deleteSprint = 'DELETE FROM Sprints ' + whereSprintDelete
    let tasks_sprint = [null, req.body.sprintID, req.body.projectID]
    let delete_sprint = [req.body.sprintID, req.body.projectID]
    var Tasks = []
    let recovery_sprint = [req.body.sprintID, Tasks, req.body.projectID]

    //taskID read karavine store karavano
    connectionObject.query(getTasksSprint, tasks_sprint, (err, result) => {
        if (err) {
            // throw err;
            res.status(503).json({ msg: `Error while getting tasks in database for sprint: ${req.body.sprintID}` });
        }
        else {
            if (result != undefined) {
                console.log('result: ', result);
                result.forEach(element => {
                    Tasks.push(element.taskid)
                });
            }
            connectionObject.query(updateTasksSprint, delete_sprint, (err, result) => {
                if (err) {
                    // throw err;
                    res.status(503).json({ msg: `Error while updating tasks for sprint: ${req.body.sprintID} in database ` });                    
                } else {
                    // connectionObject.query(updateTasksSprint, tasks_sprint, (err, result) => {
                    connectionObject.query(deleteSprint, delete_sprint, (err, result) => {
                        if (err) {
                            // throw err;
                            connectionObject.query(recoveryUpdateTasksSprint, recovery_sprint, (err, result) => {
                                if (err) {
                                    // throw err;
                                    res.status(503).json({ msg: `Database goes into inconsistent state for Tasks of sprint: ${req.body.sprintID}` });
                                } else {
                                    res.status(503).json({ msg: `Error while deleting sprint in database for sprint: ${req.body.sprintID}` });
                                }
                            })
                            
                        } else {
                            res.status(200).json({ msg: `Sprint with ${req.body.sprintID} is successfully deleted!` });
                        }
                    })
                }
            })   
        }
    })
}

module.exports.deleteSprint = deletesprint;