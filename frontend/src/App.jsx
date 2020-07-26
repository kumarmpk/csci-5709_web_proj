import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Login from "./login/Login";
import LandingPage from "./landing-page/LandingPage";
import Register from "./register/Register";

import Home from "./common-components/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import ResetPassword from "./reset-password/ResetPassword";
import ViewProject from "./view-project/ViewProject";
import NotFound from "./NotFound";
import AboutUs from "./about-us/AboutUs";
import ContactUs from "./contact-us/ContactUs";
import CreateProject from "./create-project/CreateProject";
import Search from "./search/Search";
import CreateTask from "./create-task/CreateTask";
import Dashboard from "./dashboard/Dashboard";
import Users from "./users/Users";
import Sidebar from "../src/common-components/Sidebar";
import AppHeader from "../src/common-components/AppHeader";
import HomePageHeader from "../src/common-components/HomePageHeader";
import Announcement from "../src/announcement/Announcement";
import "./App.css";
import ViewTask from "../src/view-task/ViewTask";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SideBarPath: [
        "/",
        "/login",
        "/register",
        "/resetpassword",
        "/about-us",
        "/contact-us",
      ],
    };
  }

  render() {
    // console.log("hist", this.props.history.location.pathname);
    // console.log("con:", this.state.SideBarPath.includes(this.props.history.location.pathname));

    const { SideBarPath } = this.state;
    const {
      location: { pathname },
    } = this.props;
    const isAuthenticated = SideBarPath.includes(pathname);

    return (
      <article className="">
        <section className="row no-margin-row">
          {isAuthenticated ? null : <Sidebar />}
        </section>

        {isAuthenticated ? (
          <header className={isAuthenticated ? null : "margin-col-content"}>
            <AppHeader />
          </header>
        ) : (
          <header
            className={
              isAuthenticated ? "homeHeader" : "margin-col-content homeHeader"
            }
          >
            <HomePageHeader />
          </header>
        )}

        {/* <section className="content col-9"> */}
        <section
          className={`content margin-content-top ${
            isAuthenticated ? "" : "margin-col-content"
          }`}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <LandingPage {...props}></LandingPage>}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props}></Login>}
            ></Route>
            <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
            <ProtectedRoute path="/search" component={Search}></ProtectedRoute>
            <ProtectedRoute
              path="/create"
              component={CreateTask}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/view-task"
              component={ViewTask}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/announcements"
              component={Announcement}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
            ></ProtectedRoute>
            <ProtectedRoute path="/users" component={Users}></ProtectedRoute>
            <ProtectedRoute
              path="/projects/:projectId"
              component={ViewProject}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/createProject"
              component={CreateProject}
            ></ProtectedRoute>
            <Route
              path="/resetpassword"
              render={(props) => <ResetPassword {...props}></ResetPassword>}
            ></Route>
            <Route
              path="/register"
              render={(props) => <Register {...props}></Register>}
            ></Route>
            <Route path="/about-us" component={AboutUs}></Route>
            <Route path="/contact-us" component={ContactUs}></Route>

            <Route
              path="/not-found"
              render={(props) => <NotFound {...props}></NotFound>}
            ></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
          {/* </section> */}
          {/* </section> */}
        </section>
      </article>
    );
  }
}

export default withRouter(Routes);
