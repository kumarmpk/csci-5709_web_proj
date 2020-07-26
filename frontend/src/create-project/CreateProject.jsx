import axios from "axios";
import React, { Component } from "react";
import "../view-project/ViewProject.css";
import errMsg from "../errormessages";
import "./CreateProject.css";
import DatePicker from "react-date-picker";
import { Dropdown, Card, Modal, Button } from "react-bootstrap";
import TeamDummyData from "./TeamDummyData";

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      manager: "",
      selectedTeam: {},
      startDate: "",
      endDate: "",
      validationErrorFlag: false,
      errorMsg: "",
      modalFlag: false,
    };
  }

  componentDidMount() {}

  //this method is called to close the create page without creating the project
  //it will navigate the user back to home page
  handleClose = (e) => {
    this.props.history.push("/home");
  };

  //this method is called to create the new project
  //and on completion it will navigate the user to home page of the application
  handleCreate = (e) => {
    const { history } = this.props;
    e.preventDefault();
    console.log("selected:", this.state.selectedTeam);

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
    });

    if (
      this.state &&
      this.state.name &&
      this.state.manager &&
      this.state.startDate &&
      this.state.endDate &&
      this.state !== {} &&
      this.state.name !== "" &&
      this.state.manager !== "" &&
      this.state.startDate !== "" &&
      this.state.endDate !== ""
    ) {
      //end date cannot be lesser than start date
      if (this.state.startDate >= this.state.endDate) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["17"],
        });
        return;
      }

      const URL =
        "https://csci5709-group11-backend.herokuapp.com/project/createProject";
      axios
        .post(
          URL,
          {
            projectName: this.state.name,
            manager: this.state.manager,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          history.push("/home");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      //form error is set here
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["13"],
      });
    }
  };

  handleModalClose = (e) => {
    this.props.history.push("/home");
  };

  //this method is used to set the field values into state object
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
    });
  };

  //this method is used to set the start date value into state object
  handleStartDate = (e) => {
    this.setState({
      startDate: e,
      validationErrorFlag: false,
    });
  };

  //this method is used to set the end date value into state object
  handleEndDate = (e) => {
    this.setState({
      endDate: e,
      validationErrorFlag: false,
    });
  };

  getDropDownTeamNames = (data) => {
    return <Dropdown.Item eventKey={data.id}>{data.name}</Dropdown.Item>;
  };

  onSearchOptionSelect = (id) => {
    const selectedTeam = TeamDummyData.find((e) => e.id === Number(id));
    this.setState({ selectedTeam });
  };

  render() {
    return (
      <article className="createProject">
        <section className="createProjectForm row ">
          <section className="createProjectCard col-12 col-sm-8 col-md-6 col-lg-4 border rounded">
            <section className="createProjectCard-body p-4">
              <form>
                <h3 className="title text-center">Create Project</h3>
                <section className="mainContent">
                  <main className="form-group">
                    <label>Name*</label>
                    <input
                      required
                      type="name"
                      name="name"
                      value={this.state.name}
                      className="form-control"
                      onChange={this.handleOnChange}
                    />
                  </main>

                  <main className="form-group">
                    <label>Manager*</label>
                    <input
                      required
                      type="text"
                      name="manager"
                      value={this.state.manager}
                      onChange={this.handleOnChange}
                      className="form-control"
                    />
                  </main>

                  <section className="row">
                    {/*The datepicker library is taken from https://www.npmjs.com/package/react-date-picker [8]. */}
                    <main className="form-group col-6">
                      <label>Start Date*</label>
                      <DatePicker
                        className="dateFields"
                        value={this.state.startDate}
                        onChange={this.handleStartDate}
                        name="startDate"
                      />
                    </main>

                    {/*The datepicker library is taken from https://www.npmjs.com/package/react-date-picker [8]. */}
                    <main className="form-group col-6">
                      <label>End Date*</label>
                      <DatePicker
                        className="dateFields"
                        value={this.state.endDate}
                        onChange={this.handleEndDate}
                        name="endDate"
                      />
                    </main>
                  </section>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control  border"
                      aria-label="With textarea"
                      placeholder="Enter project description"
                    />
                  </div>

                  {this.state.validationErrorFlag && (
                    <p className="errorMsg">{this.state.errorMsg}</p>
                  )}

                  <section className="row justify-content-center">
                    <button
                      onClick={this.handleCreate}
                      className="createProjectbutton btn btn-info col-7 m-2 text-center"
                    >
                      Create
                    </button>
                    <button
                      onClick={this.handleClose}
                      className="createProjectbutton btn btn-info col-4 m-2 text-center"
                    >
                      Close
                    </button>
                  </section>
                </section>
              </form>
            </section>
          </section>
        </section>
      </article>
    );
  }
}

export default CreateProject;
