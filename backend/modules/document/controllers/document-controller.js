const connection = require("../../../MySQLCon");
var tid;

//controller method to get all documents in a project
exports.getAllDocuments = (req, res) => {
  tid = req.params.projectId;
  let sql = `Select documentName, documentID from Document where documentID IN (Select documentID from projectDocument where projectID= '${req.params.projectId}')`;
  connection.invokeQuery(
    sql,
    (result) => {
      res.status(200).json(result);
      console.log("get all documents executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};
//controller method to get document content
exports.getDocumentContent = (req, res) => {
  //tid = req.params.documentID;
  let sql = `Select documentName, documentText from Document where documentID = '${req.params.documentID}'`;
  connection.invokeQuery(
    sql,
    (result) => {
      res.status(200).json(result);
      console.log("get document's context executed");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to create a new document
exports.addNewDoc = (userData, userData2, res) => {
  let sql = `INSERT INTO Document (documentName, documentText) VALUES ('${userData}','${userData2}'); `;
  connection.invokeQuery(
    sql,
    (result1) => {
      let sql2 = `Select documentID from Document where documentName= '${userData}'; `;
      connect.query(
        sql2,
        (result2) => {
          var string = JSON.stringify(result2);
          var json = JSON.parse(string);

          let sql3 = `INSERT INTO projectDocument (projectID, documentID) VALUES ('${tid}','${json[0].documentID}');`;
          connection.invokeQuery(
            sql3,
            (result3) => {
              console.log("Document created successfully");
            },
            (err3) => {
              if (err3) {
                console.log("error occured");
                console.log("Error ", err3);
              }
            }
          );
        },
        (err2) => {
          if (err2) {
            console.log("error occured");
            console.log("Error ", err2);
          }
        }
      );
    },
    (err1) => {
      if (err1) {
        console.log("error occured");
        console.log("Error ", err1);
      }
    }
  );
};

//method to update a new
exports.updateDocContent = (userData, userData2, docParam, res) => {
  let sql = `UPDATE Document SET documentText= '${userData2}' WHERE documentID = '${docParam}'; `;
  connection.invokeQuery(
    sql,
    (result) => {
      console.log("Document updated successfully");
    },
    (err) => {
      if (err) {
        console.log("error occured");
        console.log("Error ", err);
      }
    }
  );
};

//method to delete a document
exports.deleteDoc = (req, res) => {
  let sql = `Delete from projectDocument where documentID='${req.params.id}';`;

  connection.invokeQuery(
    sql,
    (result1) => {
      let sql2 = `Delete from Document where documentID='${req.params.id}';`;

      connection.invokeQuery(
        sql2,
        (result2) => {
          return res.status(200).send("Document Deleted successfully");
        },
        (err2) => {
          if (err2) {
            console.log("error occured");
            console.log("Error ", err2);
          }
        }
      );
    },
    (err1) => {
      if (err1) {
        console.log("error occured");
        console.log("Error ", err1);
      }
    }
  );
};

//method to get all members of the team
exports.getAllProjects = (req, res) => {
  //tname = req.params.teamID;
  // let uid = localStorage.userID;
  if (req.params.uId == "2") {
    let sql = `Select projectName, projectID from Project;`;
    //let sql = `Select projectName, projectID from Project;`;
    connection.invokeQuery(
      sql,
      (result) => {
        res.status(200).json(result);
        console.log("get all projects executed for admin");
      },
      (err) => {
        if (err) {
          console.log("error occured");
          console.log("Error ", err);
        }
      }
    );
  } else {
    let sql = `Select projectName, projectID from Project where projectID IN (Select project_ID from projectUserTeam where team_ID IN (Select teamID from userTeam where userID='${req.params.uId}' ));`;

    connection.invokeQuery(
      sql,
      (result) => {
        res.status(200).json(result);
        console.log("get all projects executed");
      },
      (err) => {
        if (err) {
          console.log("error occured");
          console.log("Error ", err);
        }
      }
    );
  }
};
