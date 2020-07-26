import React, { Component } from "react";
import axios from "axios";
import "./Projects.css";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ProjectDummyData from "./ProjectDummyData";

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProjects: [],
      text: "",
      searchOption: "pname",
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects(projectName) {
    const URL =
      "https://csci5709-group11-backend.herokuapp.com/project/getProjects";
    axios
      .get(URL, {
        params: { projectName },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ filteredProjects: res.data });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }

  onTextChanged = (e) => {
    const value = e.target.value.trim().toLowerCase();
    this.fetchProjects(value);
  };

  searchForProjects = (value) => {
    let temp = [];
    let abs =
      ProjectDummyData.length > 0
        ? ProjectDummyData.map((obj, key) => {
            if (obj.projectName.toLowerCase().includes(value)) {
              temp.push(obj);
            }
          })
        : null;
    this.setState(() => ({ filteredProjects: temp }));
  };

  displayProjTable = () => {
    return this.state.filteredProjects.length > 0 ? (
      <div className="col-12 col-sm-12">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Project Name</th>
              <th>Manager</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredProjects.map((data) => {
              return (
                <tr>
                  <th>{data.projectName}</th>
                  <td>{data.manager || "-"}</td>
                  <td>{new Date(data.endDate).toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="col-12 col-sm-12">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Project Name</th>
              <th>Team Name</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
        <h3>No projects matching with your search found</h3>
      </div>
    );
  };
  onSearchOptionSelect = (e) => {
    this.setState(() => ({ searchOption: e }));
    console.log("sate:", this.state.searchOption);
  };
  setDropDownName = () => {
    if (this.state.searchOption === "pname") {
      return "Project Name";
    } else if (this.state.searchOption === "tname") {
      return "Team Name";
    } else {
      return "Status";
    }
  };
  render() {
    return (
      <div>
        <div className="row margin-row justify-content-start">
          <div className="container-fluid">
            <div className="form-inline my-2 my-lg-0">
              <input
                className="form-control my-2 mr-sm-2 search border rounded"
                type="search"
                onChange={this.onTextChanged}
                placeholder="Search Project Name"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="container-fluid"></div>
        </div>
        <div className="row margin-row">
          <div className=" pl-3 justify-content-start">
            <h2>Projects</h2>
          </div>
          <div className="pr-3 ml-auto">
            <Link to="/createproject">
              <button className="createButton" name="Create Project">
                Create Project
              </button>
            </Link>
          </div>
        </div>
        <div className="row margin-row">{this.displayProjTable()}</div>
      </div>
    );
  }
}
export default withRouter(Projects);
