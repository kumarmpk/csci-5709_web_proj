/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const connection = require("../../../MySQLCon");

const VerifyOtpController = (userData, response) => {
  console.log("otp controller", userData);

  let email = userData.email;
  var otp = userData.otp;

  let select_otp_query = `SELECT otp from Otp where email='${email}' order by id desc LIMIT 1`;

  console.log(select_otp_query);

  connection.invokeQuery(
    select_otp_query,
    (result) => {
      result = JSON.parse(JSON.stringify(result));
      console.log("otp from outside:", otp);
      console.log("otp from db:", result[0]["otp"]);
      if (result.length === 0) {
        response("41");
      } else {
        if (result[0]["otp"] === otp) {
          response("40");
        } else {
          response("42");
        }
      }
      console.log(result);
    },
    (error) => {
      if (error) {
        response("41");
        console.log("error5", error);
      }
    }
  );
};

module.exports.VerifyOtpController = VerifyOtpController;
