const mysql = require("mysql");
const config = require("../../../config");

let database = mysql.createConnection({
    host: config.mySQLConfig.host,
    user: config.mySQLConfig.user,
    password: config.mySQLConfig.password,
    port: config.mySQLConfig.port,
});

const LoginController = (userData, response) => {
    let email = userData.email;
    let password = userData.password;

    let select_user_query = `SELECT userName from webproject.User where email='${email}' and password='${password}'`;

    database.query(select_user_query, function (error, result) {
        if (error) {
            response("1")
            throw error;
        }

        result = JSON.parse(JSON.stringify(result))
        if (result.length === 0) {
            response("1");
        } else {
            response("4");
        }

        console.log(result);
        console.log(result[0]);
        console.log("User logged in successfully");
    });
}


module.exports.LoginController = LoginController;
