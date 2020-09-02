/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const connection = require("../../../MySQLCon");

const RegisterController = (userData, response) => {
  console.log(userData);

  let username = userData.name;
  let email = userData.email;
  let password = userData.password;

  let create_user_query = `INSERT INTO User(userName, email, password) values ('${username}', '${email}', 
              '${password}');`;

  connection.invokeQuery(
    create_user_query,
    (result) => {
      console.log(result);
      response(1);
    },
    (err) => {
      console.log(err);
      response(0);
    }
  );
};

module.exports.RegisterController = RegisterController;
