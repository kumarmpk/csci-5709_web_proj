const mysql = require("mysql");
const config = require("../../../config");
var tid;
var tname;

let connect = mysql.createConnection({
  host: config.mySQLConfig.host,
  user: config.mySQLConfig.user,
  password: config.mySQLConfig.password,
  port: config.mySQLConfig.port,
});

//creating DB connection
let query = "use " + config.mySQLConfig.database;

connect.connect(function (error) {
  if (error) {
    throw error;
  }
  connect.query(query, function (error, result) {
    if (error) {
      throw error;
    }
    console.log("DB is connected !");
  });
});

//controller method to get all documents in a project
exports.getAllDocuments = (req, res) => {
  tid = req.params.projectId;
  let sql = `Select documentName, documentID from Document where documentID IN (Select documentID from projectDocument where projectID= '${req.params.projectId}')`;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
    res.status(200).json(result);
    console.log("get all documents executed");
  });
};
//controller method to get document content
exports.getDocumentContent = (req, res) => {
  //tid = req.params.documentID;
  let sql = `Select documentName, documentText from Document where documentID = '${req.params.documentID}'`;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
    res.status(200).json(result);
    console.log("get document's context executed");
  });
};

//method to create a new document
exports.addNewDoc = (userData, userData2, res) => {
  let sql = `INSERT INTO Document (documentName, documentText) VALUES ('${userData}','${userData2}'); `;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
    let sql2 = `Select documentID from Document where documentName= '${userData}'; `;
    let sqlquery2 = connect.query(sql2, (err, result) => {
      if (err) {
        console.log("error occured");
        throw err;
      }

      var string = JSON.stringify(result);
      var json = JSON.parse(string);

      let sql3 = `INSERT INTO projectDocument (projectID, documentID) VALUES ('${tid}','${json[0].documentID}');`;
      let sqlquery3 = connect.query(sql3, (err, result) => {
        if (err) {
          console.log("error occured");
          throw err;
        }

        console.log("Document created successfully");
      });
    });
  });
};

//method to update a new
exports.updateDocContent = (userData, userData2, docParam, res) => {
  let sql = `UPDATE Document SET documentText= '${userData2}' WHERE documentID = '${docParam}'; `;
  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }

    console.log("Document updated successfully");
  });
};

//method to delete a document
exports.deleteDoc = (req, res) => {
  let sql = `Delete from projectDocument where documentID='${req.params.id}';`;

  let sqlquery = connect.query(sql, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
  });
  let sql2 = `Delete from Document where documentID='${req.params.id}';`;

  let sqlquery2 = connect.query(sql2, (err, result) => {
    if (err) {
      console.log("error occured");
      throw err;
    }
    return res.status(200).send("Document Deleted successfully");
  });
};

//method to get all members of the team
exports.getAllProjects = (req, res) => {
  //tname = req.params.teamID;
  // let uid = localStorage.userID;
  if (req.params.uId == "2") {
    let sql = `Select projectName, projectID from Project;`;
    //let sql = `Select projectName, projectID from Project;`;
    let sqlquery = connect.query(sql, (err, result) => {
      if (err) {
        console.log("error occured");
        throw err;
      }
      res.status(200).json(result);
      console.log("get all projects executed for admin");
    });
  } else {
    let sql = `Select projectName, projectID from Project where projectID IN (Select project_ID from projectUserTeam where team_ID IN (Select teamID from userTeam where userID='${req.params.uId}' ));`;
    //let sql = `Select projectName, projectID from Project;`;
    let sqlquery = connect.query(sql, (err, result) => {
      if (err) {
        console.log("error occured");
        throw err;
      }
      res.status(200).json(result);

      console.log("get all projects executed");
    });
  }
};
