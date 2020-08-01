//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyOrder API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var modifyOrder = (req, res) => {
    //vadhare sprint na order change karvana
    console.log('req', req.body);
    if (!req.body.hasOwnProperty("sprintID") || !req.body.hasOwnProperty("projectID") || !req.body.hasOwnProperty("order")) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details such as  sprintID, projectID, and order` });
    }

    let whereSprint = 'WHERE sprintID = ? and projectID = ?'
    let getIsComplete = 'SELECT isComplete, Sprints.order as curOrder from Sprints ' + whereSprint
    let sprint_details = [req.body.sprintID, req.body.projectID]
    var curSprintOrder;

    let whereActiveSprint = 'WHERE isComplete = ? and projectID = ?'
    let activeSprintOrderQury = 'SELECT Sprints.order as actvOrder from Sprints ' + whereActiveSprint
    let active_sprint_order = [0, req.body.projectID]
    var activeSprintOrder;

    let whereMaxOrder = 'WHERE isComplete != ? and projectID = ?'
    let maxOrderQuery = 'SELECT MAX(Sprints.order) as maxOrder from Sprints ' + whereMaxOrder
    let max_order_detail = [1, req.body.projectID]
    var maxOrder;

    let whereMinOrder = 'WHERE isComplete != ? and projectID = ?'
    let minOrderQuery = 'SELECT MIN(Sprints.order) as minOrder from Sprints ' + whereMinOrder
    let min_order_detail = [1, req.body.projectID]
    var minOrder;

    let whereOrderSprint = 'WHERE Sprint.order = ? and projectID = ?'
    let moveSprintQuery = 'UPDATE Sprints SET Sprints.order = ? ' + whereOrderSprint
    var move_cur_sprint_details
    var move_other_sprint_details
    // let other_sprint_details = [(activeSprintOrder+, ]


    connectionObject.query(getIsComplete, sprint_details, (err, result) => {
        if (err) {
            res.status(503).json({ msg: `Error while getting status of sprint: ${req.body.sprintID} in database` });
        } else {
            if (result[0].isComplete == 0) {
                res.status(400).json({ msg: `You cannot change order of active sprint sprintID: ${req.body.sprintID} and projectID: ${req.body.projectID}` });
            } else if (result[0].isComplete == null) {
                console.log('result', result)
                curSprintOrder = result[0].curOrder

                connectionObject.query(maxOrderQuery, max_order_detail, (err, result) => {
                    if (err) {
                        res.status(503).json({ msg: `Error while getting order of last sprint from database` });
                    } else {
                        maxOrder = result[0].maxOrder

                        //getting min order
                        connectionObject.query(minOrderQuery, min_order_detail, (err, result) => {
                            if (err) {
                                res.status(503).json({ msg: `Error while getting order of first sprint from database` });
                            } else {
                                minOrder = result[0].minOrder

                                if (minOrder == maxOrder) {
                                    res.status(203).json({ msg: `only single sprint available. Move operation is not valid` });
                                } else {
                                    //getting order of active sprint
                                    connectionObject.query(activeSprintOrderQury, active_sprint_order, (err, result) => {
                                        if (err) {
                                            res.status(503).json({ msg: `Error while getting order of active sprint from database` });
                                        } else {
                                            if (result != undefined) {
                                                activeSprintOrder = result[0].actvOrder
                                                if (req.body.order == 0 && curSprintOrder != activeSprintOrder + 1) {
                                                    //move sprint up
                                                    move_cur_sprint_details = [curSprintOrder - 1, curSprintOrder, req.body.projectID]
                                                    move_other_sprint_details = [curSprintOrder, curSprintOrder - 1, req.body.projectID]

                                                    connectionObject.query(moveSprintQuery, move_cur_sprint_details, (err, result) => {
                                                        if (err) {
                                                            res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database` });
                                                        } else {
                                                            connectionObject.query(moveSprintQuery, move_other_sprint_details, (err, result) => {
                                                                if (err) {
                                                                    res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database. Database is in inconsistent state with 2 sprint having order: ${curSprintOrder - 1} in projectID: ${req.body.projectID}` });
                                                                } else {
                                                                    res.status(200).json({ msg: `sprint with sprintID: ${req.body.sprintID} successfully moved up` });
                                                                }
                                                            })
                                                        }
                                                    })

                                                } else if (req.body.order == 0 && curSprintOrder == activeSprintOrder + 1) {
                                                    res.status(503).json({ msg: `You cannot move your sprint with sprintID: ${sprintID} above active sprint` });
                                                } else if (req.body.order == 1 && curSprintOrder == maxOrder) {
                                                    res.status(503).json({ msg: `You cannot move your sprint with sprintID: ${sprintID} down as it is last sprint` });
                                                } else if (req.body.order == 1 && curSprintOrder != maxOrder) {
                                                    //move sprint down
                                                    move_cur_sprint_details = [curSprintOrder + 1, curSprintOrder, req.body.projectID]
                                                    move_other_sprint_details = [curSprintOrder, curSprintOrder + 1, req.body.projectID]

                                                    connectionObject.query(moveSprintQuery, move_cur_sprint_details, (err, result) => {
                                                        if (err) {
                                                            res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database` });
                                                        } else {
                                                            connectionObject.query(moveSprintQuery, move_other_sprint_details, (err, result) => {
                                                                if (err) {
                                                                    res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database. Database is in inconsistent state with 2 sprint having order: ${curSprintOrder - 1} in projectID: ${req.body.projectID}` });
                                                                } else {
                                                                    res.status(200).json({ msg: `sprint with sprintID: ${req.body.sprintID} successfully moved down` });
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            } else {
                                                //no active sprint
                                                if (req.body.order == 0 && curSprintOrder != minOrder) {
                                                    //movr sprint up
                                                    move_cur_sprint_details = [curSprintOrder - 1, curSprintOrder, req.body.projectID]
                                                    move_other_sprint_details = [curSprintOrder, curSprintOrder - 1, req.body.projectID]

                                                    connectionObject.query(moveSprintQuery, move_cur_sprint_details, (err, result) => {
                                                        if (err) {
                                                            res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database` });
                                                        } else {
                                                            connectionObject.query(moveSprintQuery, move_other_sprint_details, (err, result) => {
                                                                if (err) {
                                                                    res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database. Database is in inconsistent state with 2 sprint having order: ${curSprintOrder - 1} in projectID: ${req.body.projectID}` });
                                                                } else {
                                                                    res.status(200).json({ msg: `sprint with sprintID: ${req.body.sprintID} successfully moved up` });
                                                                }
                                                            })
                                                        }
                                                    })


                                                } else if (req.body.order == 0 && curSprintOrder == minOrder) {
                                                    //cannot up
                                                    res.status(503).json({ msg: `You cannot move your sprint with sprintID: ${sprintID} up. As it is first sprint in project with projectID: ${req.body.projectID}` });
                                                } else if (req.body.order == 1 && curSprintOrder == maxOrder) {
                                                    //cannot down
                                                    res.status(503).json({ msg: `You cannot move your sprint with sprintID: ${sprintID} down as it is last sprint` });
                                                } else if (req.body.order == 1 && curSprintOrder != maxOrder) {
                                                    //move down
                                                    move_cur_sprint_details = [curSprintOrder + 1, curSprintOrder, req.body.projectID]
                                                    move_other_sprint_details = [curSprintOrder, curSprintOrder + 1, req.body.projectID]

                                                    connectionObject.query(moveSprintQuery, move_cur_sprint_details, (err, result) => {
                                                        if (err) {
                                                            res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database` });
                                                        } else {
                                                            connectionObject.query(moveSprintQuery, move_other_sprint_details, (err, result) => {
                                                                if (err) {
                                                                    res.status(503).json({ msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database. Database is in inconsistent state with 2 sprint having order: ${curSprintOrder - 1} in projectID: ${req.body.projectID}` });
                                                                } else {
                                                                    res.status(200).json({ msg: `sprint with sprintID: ${req.body.sprintID} successfully moved down` });
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        })

                    }
                })
            }
        }
    })
}

module.exports.modifyOrder = modifyOrder