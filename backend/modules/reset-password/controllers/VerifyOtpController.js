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

const VerifyOtpController = (userData, response) => {
    console.log("otp controller", userData);

    let email = userData.email;
    var otp = userData.otp;

    let select_otp_query = `SELECT otp from webproject.Otp where email='${email}' order by id desc LIMIT 1`;

    console.log(select_otp_query);

    database.query(select_otp_query, otp, function (error, result) {
        if (error) {
            response("41")
            throw error;
        }
        result = JSON.parse(JSON.stringify(result))
        console.log("otp from outside:", otp);
        console.log("otp from db:", result[0]["otp"]);
        if (result.length === 0) {
            response("41")
        } else {
            if (result[0]['otp'] == otp) {
                response("40")
            } else {
                response("42")
            }
        }
        console.log(result)
        database.end();
    });

}

module.exports.VerifyOtpController = VerifyOtpController;