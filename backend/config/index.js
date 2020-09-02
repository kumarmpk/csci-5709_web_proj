module.exports = {
  /* mySQLConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  },

  emailConfig: {
    service: process.env.MAIL_SERVICE,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  }, */
  mySQLConfig: {
    host: "db.cs.dal.ca",
    user: "manoharan",
    password: "B00837436",
    database: "manoharan",
    port: 3306,
  },
  sshTunnelConfig: {
    username: "manoharan",
    password: "B00837436",
    host: "bluenose.cs.dal.ca",
    port: 22,
  },

  emailConfig: {
    service: "gmail",
    user: "ProtrackerComm@gmail.com",
    pass: "Pass@123",
  },
};
