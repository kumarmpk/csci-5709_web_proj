//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Contact Us feature controller

const nodemailer = require("nodemailer");
const mysql = require("mysql");
const config = require("../../../config");
const { contactUs } = require("../../../constants");

let connect = mysql.createConnection({
  host: config.mySQLConfig.host,
  user: config.mySQLConfig.user,
  password: config.mySQLConfig.password,
  port: config.mySQLConfig.port,
});

let query = "use " + config.mySQLConfig.database;

connect.connect(function (error) {
  if (error) {
    throw error;
  }
  connect.query(query, function (error, result) {
    if (error) {
      throw error;
    }
  });
});

let transporter = nodemailer.createTransport({
  service: config.emailConfig.service,
  auth: {
    user: config.emailConfig.user,
    pass: config.emailConfig.pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    throw error;
  }
});

function handleSpecialChar(str) {
  let one_single_quote = "'";
  let two_single_quotes = "''";
  let one_slash = "\\";
  let two_slashes = "\\\\";

  str = str.replace(one_single_quote, two_single_quotes);
  str = str.replace(one_slash, two_slashes);

  return str;
}

const post_contact_us = (contact_us_obj, response) => {
  try {
    let userMailStatus = "";
    let teamMailStatus = "";
    let username = contact_us_obj.name;
    let user_message = contact_us_obj.message;
    let user_email_subject = contact_us_obj.subject;
    let user_email_address = contact_us_obj.email;
    let attachment = contactUs.attachment();

    let user_email = {
      from: contactUs.from,
      to: user_email_address,
      subject: contactUs.user_email_subject,
      html: contactUs.user_email_message(username),
      attachments: [attachment],
    };

    transporter.sendMail(user_email, (user_email_err, user_email_res) => {
      if (user_email_err) {
        userMailStatus = "Failed";
      } else {
        userMailStatus = "Success";

        let team_email = {
          from: contactUs.from,
          to: contactUs.team_mail_list,
          subject: contactUs.team_email_subject(username),
          html: contactUs.team_email_message(
            user_email_address,
            user_email_subject,
            user_message
          ),
        };
        transporter.sendMail(team_email, (team_email_err, team_email_res) => {
          if (team_email_err) {
            teamMailStatus = "Failed";
          } else {
            teamMailStatus = "Success";
          }

          username = handleSpecialChar(username);
          user_email_address = handleSpecialChar(user_email_address);
          user_email_subject = handleSpecialChar(user_email_subject);
          user_message = handleSpecialChar(user_message);

          let query = `insert into ContactUs(username, emailaddress, subject, description, date, 
              usermailstatus, teammailstatus) values ('${username}', '${user_email_address}', 
              '${user_email_subject}', '${user_message}', sysdate(), '${userMailStatus}', '${teamMailStatus}');`;

          dbExecute(query, (dbResponse) => {
            if (
              dbResponse === "18" &&
              userMailStatus === "Success" &&
              teamMailStatus === "Success"
            ) {
              response("18");
            } else {
              response("19");
            }
          });
        });
      }
    });
  } catch (e) {
    response("19");
  }
};

function dbExecute(query, response) {
  connect.query(query, (err, result) => {
    if (err) {
      response("19");
    } else {
      response("18");
    }
  });
}

module.exports.post_contact_us = post_contact_us;
