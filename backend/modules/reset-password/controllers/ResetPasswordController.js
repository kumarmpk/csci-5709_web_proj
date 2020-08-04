/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const mysql = require("mysql");
const config = require("../../../config");

let database = mysql.createConnection({
    host: config.mySQLConfig.host,
    user: config.mySQLConfig.user,
    password: config.mySQLConfig.password,
    port: config.mySQLConfig.port,
});

const ResetPasswordController = (userData, response) => {
    console.log(userData);

    let email = userData.email;
    let password = userData.password;

    let update_password_query = `UPDATE webproject.User SET password='${password}' WHERE email='${email}'`;



    database.query(update_password_query, function (error, result) {
        if (error) {
            response("33")
            throw error;
        }
        result = JSON.parse(JSON.stringify(result))

        if (result['affectedRows'] == 1) {
            response("34")
        } else {
            response("33")
        }
        console.log(result);
    });
}


module.exports.ResetPasswordController = ResetPasswordController;
