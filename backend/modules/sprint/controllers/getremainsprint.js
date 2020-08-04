//  Author: Falgun Patel
//  Banner Id:  B00845029
//  GetUncompletedSprints API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon');

var getNotCompletedSprint = (req, res) => {
    // console.log(req.body);
    if (
        !req.body.hasOwnProperty("projectID") || req.body['projectID'] == null
    ) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details- projectID` });
    } else if (Number.isInteger(req.body['projectID']) == false) {
        return res
            .status(400)
            .json({ msg: `Please enter valid projectID` });
    }

    whereSprint = 'WHERE projectID = ? and (isComplete is ? or isComplete = ?)'
    let sprintStatus = 'SELECT * from Sprints ' + whereSprint
    let sprintID = [req.body.projectID, null, 0]

    connectionObject.query(sprintStatus, sprintID, (err, result) => {
        // console.log("abcacbacbacbacb", result);
        if (err) {
            res.status(503).json({ msg: `error while fetching sprint details of project with projectID: ${req.body.projectID} from database` });
        } else {
            // console.log('result', result[0]['isComplete'][0]);  // bija cases ma
            // console.log('result', result[1]['isComplete']);   //null hoi tyare
            // console.log('result', result);
            result.forEach(element => {
                if (element['isComplete'] != null) {
                    element['isComplete'] = element['isComplete'][0]
                }
            });
            res.status(200).json({ msg: `successfully got sprint details for project with projectID: ${req.body.projectID}` 
        , data: JSON.parse(JSON.stringify(result))});
        }
    })
}

module.exports.getNotCompletedSprint = getNotCompletedSprint;