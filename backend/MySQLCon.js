const mysql = require("mysql");
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

module.exports = connectionObject;