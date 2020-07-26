/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import "./AddPeople.css";
import { Modal } from "react-bootstrap";
import {
  Link,
  withRouter,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import CONST from "../constants";

var value;

class TeamProject extends Component {
  state = {
    projects: [],
    projectName: "",
    projectID: "",
    show: false,
  };
  //method to get teams for the project
  btnClick = (e) => {
    e.preventDefault();

    var projectID = this.state.projectID;

    console.log("id=" + projectID);

    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "teams/manageteams/" + projectID;

    const res = axios.get(url, config).then((res) => {
      //console.log(res);
      this.setState({
        teams: res.data,
      });
    });
  };
  //method to set projectID parameter
  setVarVal = (e) => {
    value = this.state.projectID;
  };

  goBackClick = (e) => {
    e.preventDefault();

    const loc = window;

    loc.history.go(-2);
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "teams/getteamproject";

    axios.get(url, config).then((res) => {
      console.log(res);
      this.setState({
        projects: res.data,
      });
    });
  }

  render() {
    var v;
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />
                <h3 className="message">Team Management</h3>
                <form onSubmit={this.btnClick}>
                  <br />
                  <label className="textformat" for="people">
                    Choose a project for team details:
                  </label>
                  <br />
                  <br />
                  <select
                    className="teamDropdown"
                    value={this.state.projectID}
                    onChange={(e) =>
                      this.setState({
                        projectName: e.target.value,
                        projectID: e.target.value,
                      })
                    }
                  >
                    <option
                      className="teamDropdown"
                      class="placeholder"
                      selected
                      disabled
                      value=""
                    >
                      Select a project
                    </option>
                    {this.state.projects.map((project) => (
                      <option value={project.projectID}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>{" "}
                  <br />
                  <br />
                  <br />
                  <br />
                  <button
                    className="btn btn-info"
                    type="submit"
                    onClick={this.setVarVal()}
                  >
                    <Link
                      className="teambutton"
                      to={"/teams/manageteams/" + value}
                    >
                      See teams{" "}
                    </Link>{" "}
                  </button>
                </form>
                <br />

                <br />
                <br />
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default TeamProject;
