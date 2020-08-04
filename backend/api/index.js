const express = require("express");
const apiRoutes = express();

const TaskRoutes = require("../modules/task/routes");
const ContactUsRoutes = require("../modules/contact-us/routes");
const RegisterRoutes = require("../modules/register/routes");
const ProjectRoutes = require("../modules/project/routes");
const LoginRoutes = require("../modules/login/routes");
const ResetPasswordRoutes = require("../modules/reset-password/routes");
const TeamRoutes = require("../modules/team/routes");
const SprintRoutes = require("../modules/sprint/routes");
const DocumentRoutes = require("../modules/document/routes");

// base url for each module
apiRoutes.use("/task", TaskRoutes);
apiRoutes.use("/contact-us", ContactUsRoutes);
apiRoutes.use("/register", RegisterRoutes);
apiRoutes.use("/project", ProjectRoutes);
apiRoutes.use("/login", LoginRoutes);
apiRoutes.use("/resetpassword", ResetPasswordRoutes);
apiRoutes.use("/teams", TeamRoutes);
apiRoutes.use("/sprint", SprintRoutes);
apiRoutes.use("/docs", DocumentRoutes);

module.exports = apiRoutes;
