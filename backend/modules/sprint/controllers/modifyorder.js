//  Author: Falgun Patel
//  Banner Id:  B00845029
//  ModifyOrder API in Sprint Management and Task modification feature controller

const connection = require("../../../MySQLCon");

var modifyOrder = (req, res) => {
  console.log("req", req.body);
  if (
    !req.body.hasOwnProperty("sprintID") ||
    !req.body.hasOwnProperty("projectID") ||
    !req.body.hasOwnProperty("order")
  ) {
    return res.status(400).json({
      msg: `Please include all mandatory details such as  sprintID, projectID, and order`,
    });
  }

  let getIsComplete = `SELECT isComplete, Sprints.order as curOrder from Sprints 
                        WHERE sprintID = '${req.body.sprintID}' and projectID = '${req.body.projectID}';`;
  var curSprintOrder;

  let activeSprintOrderQury = `SELECT Sprints.order as actvOrder from Sprints 
                                WHERE isComplete = '0' and projectID = '${req.body.projectID}';`;
  var activeSprintOrder;

  let maxOrderQuery = `SELECT MAX(Sprints.order) as maxOrder from Sprints 
                        WHERE isComplete != '1' and projectID = '${req.body.projectID}';`;
  var maxOrder;

  let minOrderQuery = `SELECT MIN(Sprints.order) as minOrder from Sprints 
                        WHERE isComplete != '1' and projectID = '${req.body.projectID}';`;
  var minOrder;

  let moveSprintQuery = `UPDATE Sprints SET Sprints.order = ? WHERE Sprint.order = ? and projectID = ?;`;

  connection.invokeQuery(
    getIsComplete,
    (result1) => {
      if (result1[0].isComplete == 0) {
        res.status(400).json({
          msg: `You cannot change order of active sprint sprintID: ${req.body.sprintID} and projectID: ${req.body.projectID}`,
        });
      } else if (result1[0].isComplete == null) {
        console.log("result", result1);
        curSprintOrder = result1[0].curOrder;

        connection.invokeQuery(
          maxOrderQuery,
          (result2) => {
            maxOrder = result2[0].maxOrder;
            //getting min order
            connection.invokeQuery(
              minOrderQuery,
              (result3) => {
                minOrder = result3[0].minOrder;
                if (minOrder == maxOrder) {
                  res.status(203).json({
                    msg: `only single sprint available. Move operation is not valid`,
                  });
                } else {
                  //getting order of active sprint
                  connection.invokeQuery(
                    activeSprintOrderQury,
                    (result4) => {
                      if (result4 != undefined) {
                        activeSprintOrder = result4[0].actvOrder;
                        if (
                          req.body.order == 0 &&
                          curSprintOrder != activeSprintOrder + 1
                        ) {
                          //move sprint up
                          moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${
                                              curSprintOrder - 1
                                            } 
                                            WHERE Sprint.order = ${curSprintOrder} and 
                                            projectID = ${req.body.projectID};`;

                          connection.invokeQuery(
                            moveSprintQuery,
                            (result5) => {
                              moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${curSprintOrder} 
                                            WHERE Sprint.order = ${
                                              curSprintOrder - 1
                                            } and 
                                            projectID = ${req.body.projectID};`;
                              connection.invokeQuery(
                                moveSprintQuery,
                                (result6) => {
                                  res.status(200).json({
                                    msg: `sprint with sprintID: ${req.body.sprintID} successfully moved up`,
                                  });
                                },
                                (err1) => {
                                  if (err1) {
                                    res.status(503).json({
                                      msg: `Error while updating order of sprint with sprintID: ${
                                        req.body.sprintID
                                      } in database. Database is in inconsistent state with 2 sprint having order: ${
                                        curSprintOrder - 1
                                      } in projectID: ${req.body.projectID}`,
                                    });
                                  }
                                }
                              );
                            },
                            (err2) => {
                              if (err2) {
                                res.status(503).json({
                                  msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database`,
                                });
                              }
                            }
                          );
                        } else if (
                          req.body.order == 0 &&
                          curSprintOrder == activeSprintOrder + 1
                        ) {
                          res.status(503).json({
                            msg: `You cannot move your sprint with sprintID: ${sprintID} above active sprint`,
                          });
                        } else if (
                          req.body.order == 1 &&
                          curSprintOrder == maxOrder
                        ) {
                          res.status(503).json({
                            msg: `You cannot move your sprint with sprintID: ${sprintID} down as it is last sprint`,
                          });
                        } else if (
                          req.body.order == 1 &&
                          curSprintOrder != maxOrder
                        ) {
                          //move sprint down
                          moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${
                                              curSprintOrder + 1
                                            } 
                                            WHERE Sprint.order = ${curSprintOrder} and 
                                            projectID = ${req.body.projectID};`;

                          connection.invokeQuery(
                            moveSprintQuery,
                            (result7) => {
                              moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${curSprintOrder} 
                                            WHERE Sprint.order = ${
                                              curSprintOrder + 1
                                            } and 
                                            projectID = ${req.body.projectID};`;

                              connection.invokeQuery(
                                moveSprintQuery,
                                (result8) => {
                                  res.status(200).json({
                                    msg: `sprint with sprintID: ${req.body.sprintID} successfully moved down`,
                                  });
                                },
                                (err3) => {
                                  if (err3) {
                                    res.status(503).json({
                                      msg: `Error while updating order of sprint with sprintID: ${
                                        req.body.sprintID
                                      } in database. Database is in inconsistent state with 2 sprint having order: ${
                                        curSprintOrder - 1
                                      } in projectID: ${req.body.projectID}`,
                                    });
                                  }
                                }
                              );
                            },
                            (err4) => {
                              if (err4) {
                                res.status(503).json({
                                  msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database`,
                                });
                              }
                            }
                          );
                        }
                      } else {
                        //no active sprint
                        if (req.body.order == 0 && curSprintOrder != minOrder) {
                          //move sprint up
                          moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${
                                              curSprintOrder - 1
                                            } 
                                            WHERE Sprint.order = ${curSprintOrder} and 
                                            projectID = ${req.body.projectID};`;

                          connection.invokeQuery(
                            moveSprintQuery,
                            (result9) => {
                              moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${curSprintOrder} 
                                            WHERE Sprint.order = ${
                                              curSprintOrder - 1
                                            } and 
                                            projectID = ${req.body.projectID};`;

                              connection.invokeQuery(
                                moveSprintQuery,
                                (result10) => {
                                  res.status(200).json({
                                    msg: `sprint with sprintID: ${req.body.sprintID} successfully moved up`,
                                  });
                                },
                                (err5) => {
                                  if (err5) {
                                    res.status(503).json({
                                      msg: `Error while updating order of sprint with sprintID: ${
                                        req.body.sprintID
                                      } in database. Database is in inconsistent state with 2 sprint having order: ${
                                        curSprintOrder - 1
                                      } in projectID: ${req.body.projectID}`,
                                    });
                                  }
                                }
                              );
                            },
                            (err6) => {
                              if (err6) {
                                res.status(503).json({
                                  msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database`,
                                });
                              }
                            }
                          );
                        } else if (
                          req.body.order == 0 &&
                          curSprintOrder == minOrder
                        ) {
                          //cannot up
                          res.status(503).json({
                            msg: `You cannot move your sprint with sprintID: ${sprintID} up. As it is first sprint in project with projectID: ${req.body.projectID}`,
                          });
                        } else if (
                          req.body.order == 1 &&
                          curSprintOrder == maxOrder
                        ) {
                          //cannot down
                          res.status(503).json({
                            msg: `You cannot move your sprint with sprintID: ${sprintID} down as it is last sprint`,
                          });
                        } else if (
                          req.body.order == 1 &&
                          curSprintOrder != maxOrder
                        ) {
                          //move down
                          moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${
                                              curSprintOrder + 1
                                            } 
                                            WHERE Sprint.order = ${curSprintOrder} and 
                                            projectID = ${req.body.projectID};`;

                          connection.invokeQuery(
                            moveSprintQuery,
                            (result11) => {
                              moveSprintQuery = `UPDATE Sprints SET 
                                            Sprints.order = ${curSprintOrder} 
                                            WHERE Sprint.order = ${
                                              curSprintOrder + 1
                                            } and 
                                            projectID = ${req.body.projectID};`;

                              connection.invokeQuery(
                                moveSprintQuery,
                                (result12) => {
                                  res.status(200).json({
                                    msg: `sprint with sprintID: ${req.body.sprintID} successfully moved down`,
                                  });
                                },
                                (err7) => {
                                  if (err7) {
                                    res.status(503).json({
                                      msg: `Error while updating order of sprint with sprintID: ${
                                        req.body.sprintID
                                      } in database. Database is in inconsistent state with 2 sprint having order: ${
                                        curSprintOrder - 1
                                      } in projectID: ${req.body.projectID}`,
                                    });
                                  }
                                }
                              );
                            },
                            (err8) => {
                              if (err8) {
                                res.status(503).json({
                                  msg: `Error while updating order of sprint with sprintID: ${req.body.sprintID} in database`,
                                });
                              }
                            }
                          );
                        }
                      }
                    },
                    (err9) => {
                      if (err9) {
                        res.status(503).json({
                          msg: `Error while getting order of active sprint from database`,
                        });
                      }
                    }
                  );
                }
              },
              (err10) => {
                if (err10) {
                  res.status(503).json({
                    msg: `Error while getting order of first sprint from database`,
                  });
                }
              }
            );
          },
          (err11) => {
            if (err11) {
              res.status(503).json({
                msg: `Error while getting order of last sprint from database`,
              });
            }
          }
        );
      }
    },
    (err12) => {
      if (err12) {
        res.status(503).json({
          msg: `Error while getting status of sprint: ${req.body.sprintID} in database`,
        });
      }
    }
  );
};

module.exports.modifyOrder = modifyOrder;
