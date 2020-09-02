/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const connection = require("../../../MySQLCon");

const ResetPasswordController = (userData, response) => {
  console.log(userData);

  let email = userData.email;
  let password = userData.password;

  let update_password_query = `UPDATE User SET password='${password}' WHERE email='${email}'`;

  connection.invokeQuery(
    update_password_query,
    (result) => {
      result = JSON.parse(JSON.stringify(result));

      if (result["affectedRows"] == 1) {
        response("34");
      } else {
        response("33");
      }
      console.log(result);
    },
    (error) => {
      if (error) {
        response("33");
        console.log("error4", error);
      }
    }
  );
};

module.exports.ResetPasswordController = ResetPasswordController;
