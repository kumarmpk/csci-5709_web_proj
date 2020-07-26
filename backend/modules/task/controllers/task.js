//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Task Management feature controller

const mysql = require("mysql");
const config = require("../../../config");

let connect = mysql.createConnection({
  host: config.mySQLConfig.host,
  user: config.mySQLConfig.user,
  password: config.mySQLConfig.password,
  port: config.mySQLConfig.port,
});

let query = "use " + config.mySQLConfig.database;

connect.connect(function (error) {
  if (error) {
    throw error;
  }
  connect.query(query, function (error, result) {
    if (error) {
      throw error;
    }
  });
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

  let query = `insert into Tasks(createdDate,projectid, type, overview, description, priority, 
              owner, creator, environment, sprintid, duedate, docid) values
              (sysdate(), '${task_obj.project}', '${task_obj.type}', 
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

    connect.query(insert_task_query, (insert_task_err, insert_task_result) => {
      if (insert_task_err) {
        response("19");
      } else {
        response(insert_task_result.insertId);
      }
    });
  } catch (e) {
    response("19");
  }
};

const get_task = (taskid, response) => {
  let task_query = `select * from Tasks where taskid = ${taskid};`;
  let task_obj;
  connect.query(task_query, (task_err, task_result) => {
    if (task_err) {
      response("19");
    } else {
      if (task_result && task_result.length) {
        task_obj = task_result[0];

        let comment_query = `select comment, DATE_FORMAT(createdDate, '%b %d, %Y %h:%i %p') as createdDate From Comments 
                              where taskid = '${task_obj.taskid}' order by id desc;`;

        connect.query(comment_query, (comment_err, comment_result) => {
          if (comment_err) {
            response("19");
          } else {
            let commentList = [];
            if (comment_result && comment_result.length) {
              Object.values(comment_result).forEach((value) => {
                let comment = {};
                comment.date = value.createdDate;
                comment.comment = value.comment;
                commentList.push(comment);
              });
            }
            task_obj.commentList = commentList;
            response(task_obj);
          }
        });
      } else {
        response(task_obj);
      }
    }
  });
};

const get_user_rel_details = (userId, response) => {
  let output = {};
  let proj_query =
    `select distinct proj.projectID, proj.projectName
                        from Project proj, projectUserTeam projTeam, userTeam
                        where proj.projectID = projTeam.project_ID 
                        and projTeam.team_ID = userTeam.teamID ` + //and userTeam.userID = '1'
    ` order by proj.projectID;`;

  connect.query(proj_query, (proj_err, proj_result) => {
    if (proj_err) {
      response("19");
    } else {
      if (proj_result && proj_result.length) {
        let proj_obj = [{ id: "", name: "Select a project" }];
        Object.values(proj_result).forEach((value) => {
          let project = { id: value["projectID"], name: value["projectName"] };

          if (proj_obj && proj_obj.length) {
            proj_obj.push(project);
          } else {
            proj_obj.push(project);
          }
        });

        output["project"] = proj_obj;

        let user_query =
          `select distinct User.userID, User.userName from User, userTeam
                            where User.userID = userTeam.userID ` + //and User.userID = 1
          ` order by User.userID;`;

        connect.query(user_query, (user_err, user_res) => {
          if (user_err) {
            response("19");
          } else {
            if (user_res && user_res.length) {
              let user_obj = [{ id: "", name: "Select a user" }];
              Object.values(user_res).forEach((value) => {
                let user = {
                  id: value["userID"],
                  name: value["userName"],
                };

                if (user_obj && user_obj.length) {
                  user_obj.push(user);
                } else {
                  user_obj.push(user);
                }
              });
              output["user"] = user_obj;
            }
          }
          response(output);
        });
      } else {
        response(output);
      }
    }
  });
};

const delete_task = (taskid, response) => {
  let comment_query = `delete from Comments where taskid = (select taskid from Tasks where taskid = ${taskid});`;

  connect.query(comment_query, (comment_err, comment_result) => {
    if (comment_err) {
      response("19");
      return;
    } else {
      let task_query = `delete from Tasks where taskid = ${taskid};`;

      connect.query(task_query, (task_err, task_result) => {
        if (task_err) {
          response("19");
        } else {
          response("29");
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
      let comment_query = `insert into Comments (comment, taskid, createdDate) values 
                        ('${task_obj.comment}', '${task_obj.taskid}', now());`;

      connect.query(comment_query, (comment_err, comment_result) => {
        if (comment_err) {
          commentRes("err");
        } else {
          commentRes("32");
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

    connect.query(update_task_query, (update_err, update_result) => {
      if (update_err) {
        response("19");
      } else {
        response("30");
      }
    });
  } catch (e) {
    response("19");
  }
};

module.exports.post_task = post_task;
module.exports.get_task = get_task;
module.exports.get_user_rel_details = get_user_rel_details;
module.exports.put_task = put_task;
module.exports.delete_task = delete_task;
