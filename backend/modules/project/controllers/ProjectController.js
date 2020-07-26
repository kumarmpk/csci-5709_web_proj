//  Author: Meet Patel
//  Banner Id:  B00840009
//  Project Management feature controller

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
    if (!input && input === "") {
        return false;
    } else {
        return true;
    }
}

function createProject(req, res) {
    const { body } = req;
    if (!(body.hasOwnProperty("projectName") && body.hasOwnProperty("manager") && body.hasOwnProperty("startDate") 
    && body.hasOwnProperty("endDate"))) {
        return res.status(400).json({ msg: "Missing required parameters. Oneof ['name', 'manager', 'startDate', 'endDate']" })
    }
    else {
        let query = `insert into Project(projectName ,startDate, endDate, manager) values
            ('${body.projectName}', '${body.startDate}', 
            '${body.endDate}', '${body.manager}');`;
        connect.query(query, (error, success) => {
            if (error) {
                res.status(500).json({ msg: error });
            } else {
                res.status(201).json({ msg: "Project successfully created" });
            }
        });
    }
}


function getProjects(req, res) {
    let query
    if (req.query.projectName && req.query.projectName !== '') {
        query = `select * from Project WHERE projectName LIKE '%${req.query.projectName}%'`;
    } else {
        query = 'select * from Project';
    }
    connect.query(query, (error, success) => {
        if (error) {
            res.status(500).json({ msg: error });
        } else {
            res.status(200).json(success);
        }
    });
}

module.exports.createProject = createProject
module.exports.getProjects = getProjects