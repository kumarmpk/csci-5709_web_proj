//  Author: Meet Patel
//  Banner Id:  B00840009
//  Project Management feature router

const express = require("express");
const project_router = express.Router();

const { createProject, getProjects } = require("../controllers/ProjectController");

project_router.post('/createProject', createProject);
project_router.get('/getProjects', getProjects);

module.exports = project_router;