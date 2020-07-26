const path = require("path");

module.exports.encryption = {
  algorithm: "aes-128-cbc",
  password: "protracker",
};

module.exports.contactUs = {
  attachment: () => {
    let attachment = {
      filename: "tracker_icon.png",
      path: path.resolve("./img/tracker_icon.png"),
      cid: "logo",
    };
    return attachment;
  },
  user_email_subject: "Protracker Contact Us Submission reg",
  user_email_message: (username) => {
    return `<p>Dear ${username},</p>
                       <p>We have received your contact us submission in our Protracker website.<br/>
                       We have sent the details to our support team and they will get back to you within a business day.<br/>
                       Thanks for contacting us. Have a nice day.<p><br/></p>
                       <p>Regards,<br/>Protracker Team<br/>protrackercomm@gmail.com<br/>
                      <img src="cid:logo">
                       `;
  },
  team_email_subject: (username) => {
    return `Protracker Contact Us Submitted by ${username} at ${new Date()}`;
  },
  /* team_mail_list =
          "kumarmpk@dal.ca,kt839122@dal.ca,jp238553@dal.ca,meet.patel.23@dal.ca,fl889399@dal.ca", */
  team_mail_list: "kumarmpk@dal.ca",
  from: "PROTRACKER-A Project Management App",
  team_email_message: (
    user_email_address,
    user_email_subject,
    user_message
  ) => {
    return `<p>Hi Team,</p><p>We have received below message from the subjected user.<br/>
                            <p>User email address: ${user_email_address}<br/>
                            Subject: ${user_email_subject}<br/>
                            Message: ${user_message}</p></p><br/>
                            <p>Regards,<br/>Protracker Team<br/>protrackercomm@gmail.com<br/>
                            `;
  },
};
