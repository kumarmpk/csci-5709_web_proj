//  Author: Falgun Patel
//  Banner Id:  B00845029
//  CreateSprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var createSprint = (req, res) => {
    console.log(req.body);
    if (
        !req.body.hasOwnProperty("sprintname") ||
        !req.body.hasOwnProperty("projectID") || req.body.sprintname == ""
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- sprintname, and projectID` });
    } else if (Number.isInteger(req.body['projectID']) == false) {
        return res
            .status(400)
            .json({ msg: `Please enter valid projectID` });
    }

    let where = ' projectID = ?';
    let orderSelect = 'SELECT MAX(Sprints.order) as sprintOrder FROM Sprints WHERE' + where;
    let values = [req.body.projectID];
    var order;

    connectionObject.query(orderSelect, values, (err, result) => {
        if (err) {
            throw err;
        }

        if (result == undefined) {
            // No sprint is created for project. So, creating first sprint.
            order = 1;
        } else {
            order = result[0].sprintOrder + 1;
        }

        // console.log('result: ', result.rows);
        console.log('order: ', order);
        let sprintDataInsert = 'INSERT INTO Sprints SET ?';
        var sprintdata;
        if (req.body.description) {
            sprintdata = { order: order, sprintname: req.body.sprintname, duration: null, startdate: null, enddate: null, description: req.body.description, isComplete: null, projectID: req.body.projectID };    
        } else {
            sprintdata = { order: order, sprintname: req.body.sprintname, duration: null, startdate: null, enddate: null, description: null, isComplete: null, projectID: req.body.projectID };    
        }
        

        connectionObject.query(sprintDataInsert, sprintdata, (err, result) => {
            if (err) {
                res.status(503).json({ msg: `error while inserting new sprint details in project with projectID: ${req.body.projectID} in database` });
            }
            res.status(200).json({ msg: `New sprint: ${sprintdata.sprintname} is successfully created!` });
        });
    })

    
}

module.exports.createSprint = createSprint;