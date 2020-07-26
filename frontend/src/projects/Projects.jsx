import React, { Component } from "react";
import "./Projects.css";
// import { Container, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ProjectDummyData from "./ProjectDummyData";

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProjects: ProjectDummyData ? ProjectDummyData : [],
      text: "",
      searchOption: "pname",
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value.trim().toLowerCase();
    // console.log("value:",value);

    // let filteredProjects = [];
    if (value.length > 0) {
      this.searchForProjects(value);
    } else if (value.length === 0) {
      this.setState(() => ({
        filteredProjects: ProjectDummyData ? ProjectDummyData : [],
      }));
    }
  };

  searchForProjects = (value) => {
    let temp = [];
    let abs =
      ProjectDummyData.length > 0
        ? ProjectDummyData.map((obj, key) => {
            if (this.state.searchOption === "pname") {
              if (obj.name.toLowerCase().includes(value)) {
                temp.push(obj);
              }
            } else if (this.state.searchOption === "tname") {
              if (obj.team.toLowerCase().includes(value)) {
                //add this to shortlisted projs
                // console.log("dataTeam:", obj);
                temp.push(obj);
              }
            } else {
              if (obj.status.toLowerCase().includes(value)) {
                //add this to shortlisted projs
                // console.log("dataStatus:", obj);
                temp.push(obj);
              }
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
              <th>Team Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredProjects.map((data) => {
              return (
                <tr>
                  <th>{data.name}</th>
                  <td>{data.team}</td>
                  <td>{data.status}</td>
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
    // console.log("Selected:",e);
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
                placeholder="Search"
                aria-label="Search"
              />
              <Dropdown
                className="my-auto ml-2 createButton"
                onSelect={this.onSearchOptionSelect}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.setDropDownName()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="pname">Project Name</Dropdown.Item>
                  <Dropdown.Item eventKey="tname">Team Name</Dropdown.Item>
                  <Dropdown.Item eventKey="status">Status</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
