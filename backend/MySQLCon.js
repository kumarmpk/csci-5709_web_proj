/*const mysql = require("mysql");
const config = require("./config");

 const connectionObject = mysql.createConnection({
    host: config.mySQLConfig.host,
    user: config.mySQLConfig.user,
    password: config.mySQLConfig.password,
    port: config.mySQLConfig.port,
    database: config.mySQLConfig.database,
});

connectionObject.connect((err)=> {
    if (err) {
        console.log('Connection Error', err)
        return
    }
    console.log('Database connected', connectionObject.threadId)
})

module.exports = connectionObject; */

let mysql = require("mysql2"),
  config = require("./config"),
  sshClient = require("ssh2");

let connection = (module.exports = function () {});

connection.invokeQuery = (sqlQuery, data, errorCB) => {
  let ssh = new sshClient();
  ssh.connect(config.sshTunnelConfig);
  ssh.on("ready", () => {
    ssh.forwardOut(
      config.mySQLConfig.host,
      config.mySQLConfig.timeout,
      config.mySQLConfig.host,
      config.mySQLConfig.port,
      (err, stream) => {
        if (err) errorCB(err);
        config.mySQLConfig.stream = stream;
        let db = mysql.createPool(config.mySQLConfig);
        db.query(sqlQuery, (err, rows) => {
          if (rows) {
            data(rows);
          }
          if (err) errorCB(err);
        });
      }
    );
  });
};
