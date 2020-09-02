/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485 
*/
const connection = require("../../../MySQLCon");

const LoginController = (userData, response) => {
  let email = userData.email;
  let password = userData.password;

  let select_user_query = `SELECT userid, userName, role from User where email='${email}' and password='${password}'`;

  connection.invokeQuery(
    select_user_query,
    (result) => {
      userDetails = {};
      responseDetails = {};

      result = JSON.parse(JSON.stringify(result));
      if (result.length === 0) {
        responseDetails["code"] = "1";
        responseDetails["userDetails"] = {};
        response(responseDetails);
      } else {
        responseDetails["code"] = "4";
        responseDetails["userDetails"] = result[0];
        response(responseDetails);
      }

      console.log(result);

      console.log("User logged in successfully");
    },
    (error) => {
      responseDetails = {};
      if (error) {
        responseDetails["code"] = "1";
        responseDetails["userDetails"] = {};
        response(responseDetails);
      }
    }
  );
};

module.exports.LoginController = LoginController;
