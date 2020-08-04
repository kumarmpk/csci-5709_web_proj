//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Task Management feature controller

const mysql = require("mysql");
const config = require("../../../config");
const e = require("express");

let db = mysql.createPool({
  host: config.mySQLConfig.host,
  user: config.mySQLConfig.user,
  password: config.mySQLConfig.password,
  port: config.mySQLConfig.port,
  database: config.mySQLConfig.database,
});

function isEmpty(input) {
  if (!input || input === "") {
    return false;
  } else {
    return true;
  }
}

function handleSpecialChar(str) {
  let one_single_quote = "'";
  let two_single_quotes = "''";
  let one_slash = "\\";
  let two_slashes = "\\\\";

  str = str.replace(one_single_quote, two_single_quotes);
  str = str.replace(one_slash, two_slashes);

  return str;
}

function insertQuery(task_obj) {
  task_obj.overview = handleSpecialChar(task_obj.overview);
  task_obj.description = handleSpecialChar(task_obj.description);

  let query = `insert into Tasks(createdBy, createdDate, projectid, type, overview, description, priority, 
              owner, creator, environment, sprintid, duedate, docid) values
              ('${task_obj.userId}', sysdate(), '${task_obj.project}', '${task_obj.type}', 
              '${task_obj.overview}', '${task_obj.description}',
              '${task_obj.priority}', '${task_obj.owner}',
              '${task_obj.creator}',`;

  if (isEmpty(task_obj.environment)) {
    task_obj.environment = handleSpecialChar(task_obj.environment);
    query = query + `'${task_obj.environment}',`;
  } else {
    query = query + `null,`;
  }
  if (isEmpty(task_obj.sprint)) {
    query = query + `'${task_obj.sprint}',`;
  } else {
    query = query + `null,`;
  }
  if (isEmpty(task_obj.duedate)) {
    if (task_obj.duedate !== "0000-00-00") {
      task_obj.duedate = dateFormatter(task_obj.duedate);
      query = query + `'${task_obj.duedate}',`;
    }
  } else {
    query = query + `null,`;
  }
  if (isEmpty(task_obj.docid)) {
    query = query + `'${task_obj.docid}');`;
  } else {
    query = query + `null);`;
  }

  return query;
}

const post_task = (task_obj, response) => {
  try {
    let insert_task_query = insertQuery(task_obj);

    db.getConnection((err, connection) => {
      if (err) {
        response("19");
      } else {
        connection.query(
          insert_task_query,
          (insert_task_err, insert_task_result) => {
            connection.release();
            if (insert_task_err) {
              response("19");
            } else {
              response(insert_task_result.insertId);
            }
          }
        );
      }
    });
  } catch (e) {
    response("19");
  }
};

const get_task = (taskid, response) => {
  let task_query = `select t.*, (select userName from User where userID = t.createdBy) as createdBy
                     from Tasks t where taskid = '${taskid}';`;

  let task_obj;

  db.getConnection((err, connection) => {
    if (err) {
      response("19");
    } else {
      connection.query(task_query, (task_err, task_result) => {
        if (task_err) {
          response("19");
        } else {
          if (task_result && task_result.length) {
            task_obj = task_result[0];

            let comment_query = `select comm.comment, DATE_FORMAT(comm.createdDate, '%b %d, %Y %h:%i %p') as createdDate,
                              comm.userid userid, userName From Comments comm, User where taskid = '${task_obj.taskid}' 
                              and User.userID = comm.userid order by id desc;`;

            connection.query(comment_query, (comment_err, comment_result) => {
              if (comment_err) {
                response("19");
              } else {
                let commentList = [];

                if (comment_result && comment_result.length) {
                  Object.values(comment_result).forEach((value) => {
                    let comment = {};
                    comment.date = value.createdDate;
                    comment.comment = value.comment;
                    comment.userid = value.userid;
                    comment.userName = value.userName;
                    commentList.push(comment);
                  });
                }
                task_obj.commentList = commentList;
                connection.release();
                response(task_obj);
              }
            });
          } else {
            response(task_obj);
          }
        }
      });
    }
  });
};

const get_user_proj_list = (obj, response) => {
  try {
    let output = {};
    let proj_query = `select distinct proj.projectID, proj.projectName
                        from Project proj, projectUserTeam projTeam, userTeam
                        where proj.projectID = projTeam.project_ID 
                        and projTeam.team_ID = userTeam.teamID  `;

    if (obj.role && obj.role !== "admin") {
      proj_query = proj_query + ` and userTeam.userID = '${obj.id}' `;
    }

    proj_query = proj_query + " order by proj.projectID; ";

    db.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        response("19");
      } else {
        connection.query(proj_query, (proj_err, proj_result) => {
          if (proj_err) {
            console.log(proj_err);
            response("19");
          } else {
            if (proj_result && proj_result.length) {
              let proj_obj = [{ id: "", name: "Select a project" }];
              Object.values(proj_result).forEach((value) => {
                let project = {
                  id: value["projectID"],
                  name: value["projectName"],
                };
                proj_obj.push(project);
              });

              output["project"] = proj_obj;
              connection.release();
              response(output);
            } else {
              connection.release();
              response(output);
            }
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const get_proj_rel_dtls = (obj, response) => {
  try {
    let output = {};
    let user_query = `select distinct User.userID, User.userName from User, userTeam t1, userTeam t2 where 
                    t1.userID = User.userID and t1.teamID = t2.teamID 
                    `;

    if (obj && obj.role && obj.role !== "admin") {
      user_query = user_query + ` and t2.userID = '${obj.userId}' `;
    }

    user_query =
      user_query + ` and t2.teamID in (select team_ID from projectUserTeam `;

    if (obj && obj.role && obj.role !== "admin") {
      user_query = user_query + ` where project_ID = '${obj.projectId}' `;
    }

    user_query = user_query + ` )  order by User.userID;`;

    db.getConnection((err, connection) => {
      if (err) {
        response("19");
      } else {
        connection.query(user_query, (user_err, user_result) => {
          if (user_err) {
            response("19");
          } else {
            if (user_result && user_result.length) {
              let user_obj = [{ id: "", name: "Select a User" }];

              Object.values(user_result).forEach((value) => {
                let user = { id: value["userID"], name: value["userName"] };
                user_obj.push(user);
              });

              output["user"] = user_obj;

              let sprint_query = `select sp.sprintID, sp.sprintname from Sprints sp `;

              if (obj && obj.role && obj.role !== "admin") {
                sprint_query =
                  sprint_query + ` where sp.projectID = '${obj.projectId}' `;
              }

              sprint_query = sprint_query + ` order by sp.sprintID; `;

              connection.query(sprint_query, (sprint_err, sprint_result) => {
                if (sprint_err) {
                  response("19");
                } else {
                  if (sprint_result && sprint_result.length) {
                    let sprint_obj = [{ id: "", name: "Select a Sprint" }];

                    Object.values(sprint_result).forEach((value) => {
                      let sprint = {
                        id: value["sprintID"],
                        name: value["sprintname"],
                      };
                      sprint_obj.push(sprint);
                    });
                    output["sprint"] = sprint_obj;
                  }
                }
              });
              connection.release();
              response(output);
            } else {
              connection.release();
              response(output);
            }
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const delete_task = (taskid, response) => {
  let comment_query = `delete from Comments where taskid = (select taskid from Tasks where taskid = ${taskid});`;

  db.getConnection((err, connection) => {
    if (err) {
      response("19");
    } else {
      connection.query(comment_query, (comment_err, comment_result) => {
        if (comment_err) {
          response("19");
          return;
        } else {
          let task_query = `delete from Tasks where taskid = ${taskid};`;

          connection.query(task_query, (task_err, task_result) => {
            if (task_err) {
              response("19");
            } else {
              connection.release();
              response("29");
            }
          });
        }
      });
    }
  });
};

function dateFormatter(date) {
  var todayTime = new Date(date);
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();

  return `${year}-${month}-${day}`;
}

function updateQuery(task_obj) {
  task_obj.overview = handleSpecialChar(task_obj.overview);
  task_obj.description = handleSpecialChar(task_obj.description);

  let query = `update Tasks set overview = '${task_obj.overview}',
              description = '${task_obj.description}',
              priority = '${task_obj.priority}', 
              owner = '${task_obj.owner}',`;

  if (isEmpty(task_obj.environment)) {
    task_obj.environment = handleSpecialChar(task_obj.environment);
    query = query + `environment = '${task_obj.environment}',`;
  } else {
    query = query + `environment = null,`;
  }
  if (isEmpty(task_obj.sprintid)) {
    query = query + `sprintid = '${task_obj.sprintid}',`;
  } else {
    query = query + `sprintid = null,`;
  }
  if (isEmpty(task_obj.status)) {
    query = query + `status = '${task_obj.status}',`;
  } else {
    query = query + `status = null,`;
  }
  if (isEmpty(task_obj.duedate)) {
    if (task_obj.duedate !== "0000-00-00") {
      task_obj.duedate = dateFormatter(task_obj.duedate);
      query = query + `duedate = '${task_obj.duedate}',`;
    }
  } else {
    query = query + `duedate = null,`;
  }
  if (isEmpty(task_obj.docid)) {
    query = query + `docid = '${task_obj.docid}'`;
  } else {
    query = query + `docid = null`;
  }

  query = query + ` where taskid = ${task_obj.taskid};`;

  return query;
}

function insert_comment(task_obj, commentRes) {
  try {
    if (task_obj.comment && task_obj.comment !== "") {
      let comment_query = `insert into Comments (comment, taskid, createdDate, userid) values 
                        ('${task_obj.comment}', '${task_obj.taskid}', now(), '${task_obj.userId}');`;

      db.getConnection((err, connection) => {
        if (err) {
          commentRes("err");
        } else {
          connection.query(comment_query, (comment_err, comment_result) => {
            if (comment_err) {
              commentRes("err");
            } else {
              connection.release();
              commentRes("32");
            }
          });
        }
      });
    } else {
      commentRes(undefined);
    }
  } catch (e) {
    commentRes("err");
  }
}

const put_task = (task_obj, response) => {
  try {
    insert_comment(task_obj, (commentRes) => {
      if (commentRes === "err") return response("19");
    });

    let update_task_query = updateQuery(task_obj);

    db.getConnection((err, connection) => {
      if (err) {
        response("19");
      } else {
        connection.query(update_task_query, (update_err, update_result) => {
          if (update_err) {
            response("19");
          } else {
            connection.release();
            response("30");
          }
        });
      }
    });
  } catch (e) {
    response("19");
  }
};

module.exports.post_task = post_task;
module.exports.get_task = get_task;
module.exports.get_user_proj_list = get_user_proj_list;
module.exports.get_proj_rel_dtls = get_proj_rel_dtls;
module.exports.put_task = put_task;
module.exports.delete_task = delete_task;
