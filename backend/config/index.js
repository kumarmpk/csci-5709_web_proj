module.exports = {
  mySQLConfig: {
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
  },

  //   host: "webgroup11db.ckwpe1lbmfqz.us-east-1.rds.amazonaws.com",
  //   user: "admin",
  //   password: "KpFjM123#456$",
  //   database: "webproject",
  //   port: 3306,
  // },

  // emailConfig: {
  //   service: "gmail",
  //   user: "ProtrackerComm@gmail.com",
  //   pass: "Pass@123",
  // },
};