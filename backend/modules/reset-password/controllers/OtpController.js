/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const config = require("../../../config");
const nodemailer = require("nodemailer");
const connection = require("../../../MySQLCon");

let transporter = nodemailer.createTransport({
  service: config.emailConfig.service,
  auth: {
    user: config.emailConfig.user,
    pass: config.emailConfig.pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("error2", error);
  }
});

const OtpController = (userData, response) => {
  console.log("otp controller", userData);

  let email = userData.email;

  // otp generation code taken from https://stackoverflow.com/a/1349426/4452196
  var otp = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    otp += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  let insert_otp_query = `insert into Otp(email, otp) values('${email}', '${otp}')`;

  console.log(insert_otp_query);

  var inserted = false;
  var email_obj = {};
  email_obj["email"] = email;
  email_obj["otp"] = otp;

  connection.invokeQuery(
    insert_otp_query,
    (result) => {
      result = JSON.parse(JSON.stringify(result));

      if (result["affectedRows"] == 1) {
        // send mail with defined transport object
        content = "Your OTP is: " + otp;
        sendMail(email, content);

        console.log("sent mail called");

        response("38");
        inserted = true;
      } else {
        response("39");
      }
      console.log(result);
    },
    (error) => {
      if (error) {
        response("39");
        console.log("error3", error);
      }
    }
  );

  console.log(inserted);
};

sendMail = async (email, content) => {
  console.log("came to send mail:", email);
  let info = await transporter.sendMail({
    from: "kumarmpk@dal.ca",
    to: email,
    subject: "Reset password OTP", // Subject line
    text: content, // plain text body
    html: "<b>" + content + "</b>", // html body
  });
  console.log(info);
};

module.exports.OtpController = OtpController;
