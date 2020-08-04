//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Create Task page

import React, { Component } from "react";
import "./CreateTask.css";
import DatePicker from "react-date-picker";
import errMsg from "../errormessages";
import CONST from "../constants";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import crypto from "crypto";

class CreateTask extends Component {
  constructor(props) {
    super(props);

    let userId;
    let userRole;
    if (localStorage && localStorage.userid) {
      userId = localStorage.userid;
      userRole = localStorage.role;
    }
    this.state = {
      projectList: [],
      project: "",
      typeList: ["Task", "Issue"],
      type: "Task",
      overview: "",
      description: "",
      creatorList: [{ id: "", name: "Select a User" }],
      creator: "",
      priorityList: ["Low", "Medium", "High"],
      priority: "Low",
      environment: "",
      ownerList: [{ id: "", name: "Select a User" }],
      owner: "",
      sprintList: [{ id: "", name: "Select a sprint" }],
      sprint: "",
      duedate: "",
      validationErrorFlag: false,
      errorMsg: "",
      modalFlag: false,
      id: "",
      loading: false,
      modalRoute: 0,
      userId: userId,
      userRole: userRole,
    };
  }

  componentDidMount() {
    this.fetchAllDetails();
  }

  decryptFunc(input) {
    let key = crypto.createDecipher(
      CONST.encryption_algorithm,
      CONST.encryption_password
    );
    let output = key.update(input, "hex", "utf8");
    output += key.final("utf8");
    output = JSON.parse(output);
    return output;
  }

  async fetchAllDetails() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    this.setState({
      loading: true,
    });

    let url =
      CONST.URL + `task/user/${this.state.userId}/${this.state.userRole}`;
    await axios
      .get(url, config)
      .then((res) => {
        let obj = this.decryptFunc(res.data);

        if (!obj || Object.keys(obj).length === 0) {
          this.setState({
            loading: false,
            modalFlag: true,
            modalRoute: 1,
            modalMsg: errMsg["35"],
          });
        }

        this.setState({
          projectList: obj.project,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorMsg: errMsg["11"],
        });
      });
  }

  async createBackendAPICall() {
    try {
      let backendObj = {};
      backendObj.project = this.state.project;
      backendObj.type = this.state.type;
      backendObj.overview = this.state.overview;
      backendObj.description = this.state.description;
      backendObj.priority = this.state.priority;
      backendObj.owner = this.state.owner;
      backendObj.environment = this.state.environment;
      backendObj.creator = this.state.creator;
      backendObj.sprint = this.state.sprint;
      backendObj.duedate = this.state.duedate;
      backendObj.userId = this.state.userId;

      const headers = {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      let mykey = crypto.createCipher(
        CONST.encryption_algorithm,
        CONST.encryption_password
      );
      let encryp_backendObj = mykey.update(
        JSON.stringify(backendObj),
        "utf8",
        "hex"
      );
      encryp_backendObj += mykey.final("hex");

      let url = CONST.URL + "task";

      await axios
        .post(
          url,
          { data: encryp_backendObj },
          {
            headers,
          }
        )
        .then((res) => {
          let encryp_mess = res.data;
          let dmykey = crypto.createDecipher(
            CONST.encryption_algorithm,
            CONST.encryption_password
          );
          let obj = dmykey.update(encryp_mess, "hex", "utf8");
          obj += dmykey.final("utf8");
          obj = JSON.parse(obj);

          if (obj && obj.id) {
            this.setState({
              modalMsg: `The ${this.state.type} has been successfully created and can be
            tracked by the Id: "${obj.id}".`,
              modalFlag: true,
              modalRoute: 1,
              email: "",
              name: "",
              subject: "",
              message: "",
              id: obj.id,
              loading: false,
            });
          } else {
            this.setState({
              validationErrorFlag: true,
              errorMsg: errMsg[obj],
              loading: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            validationErrorFlag: true,
            errorMsg: errMsg["11"],
            modalMsg: errMsg["11"],
            modalFlag: true,
            loading: false,
          });
        });
    } catch (err) {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["11"],
        modalMsg: errMsg["11"],
        modalFlag: true,
        loading: false,
      });
    }
  }

  onCreate = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
      loading: true,
    });

    if (
      this.state &&
      this.state.project &&
      this.state.type &&
      this.state.overview &&
      this.state.description &&
      this.state.priority &&
      this.state.owner &&
      this.state.creator &&
      this.state !== {} &&
      this.state.project !== "" &&
      this.state.type !== "" &&
      this.state.overview.trim() !== "" &&
      this.state.description.trim() !== "" &&
      this.state.priority !== "" &&
      this.state.owner !== "" &&
      this.state.creator !== ""
    ) {
      let currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );

      if (
        this.state.duedate &&
        this.state.duedate !== "" &&
        this.state.duedate < currentDate
      ) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["20"],
          loading: false,
        });
        return;
      }
      this.createBackendAPICall();
    } else {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["13"],
        loading: false,
      });
    }
  };

  handleDueDate = (e) => {
    this.setState({
      duedate: e,
      validationErrorFlag: false,
    });
  };

  handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
      validationErrorFlag: false,
    });

    if (name === "project") {
      this.getProjectSpecificDetails(value);
    }
  };

  async getProjectSpecificDetails(projectId) {
    this.setState({
      loading: true,
    });

    let url =
      CONST.URL +
      `task/${projectId}/${this.state.userId}/${this.state.userRole}`;

    await axios
      .get(url)
      .then((res) => {
        let obj = this.decryptFunc(res.data);

        if (!obj || Object.keys(obj).length === 0) {
          this.setState({
            loading: false,
            modalFlag: true,
            modalRoute: 1,
            modalMsg: errMsg["35"],
          });
        }

        this.setState({
          ownerList: obj.user,
          creatorList: obj.user,
          loading: false,
        });

        if (obj.sprint) {
          this.setState({
            sprintList: obj.sprint,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          modalRoute: 1,
          modalMsg: errMsg["19"],
          modalFlag: true,
        });
      });
  }

  handleModalClose = (e) => {
    if (this.state.modalRoute === 1) {
      this.props.history.push("/home");
    } else {
      this.setState({
        modalFlag: false,
      });
    }
  };

  handleLoadingClose = (e) => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <section>
        <section className="container fluid pt-2 pb-4">
          <section className="row ">
            <section className="container fluid">
              <section className="row justify-content-center">
                <section className="col create-section ">
                  <main className="col-sm-12 text-center pt-1 pb-1">
                    {this.state.validationErrorFlag ? (
                      <p style={{ color: "red" }} className="errorMsg">
                        {" "}
                        {this.state.errorMsg}{" "}
                      </p>
                    ) : null}
                  </main>
                  <section className="col-sm-12 text-center pt-2 pb-4">
                    <h3 className="createTitle ">Create Task</h3>
                  </section>
                  <form className="form-container">
                    <section className="row ">
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="project"> Project* </label>
                        <select
                          value={this.state.project}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="project"
                          name="project"
                          required
                        >
                          {this.state.projectList &&
                            this.state.projectList.map((projectOption) => (
                              <option
                                key={projectOption.name}
                                value={projectOption.id}
                              >
                                {projectOption.name}
                              </option>
                            ))}
                        </select>
                      </section>
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="type">Type*</label>
                        <select
                          value={this.state.type}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="type"
                          name="type"
                          required
                        >
                          {this.state.typeList.map((typeOption) => (
                            <option key={typeOption} value={typeOption}>
                              {typeOption}
                            </option>
                          ))}
                        </select>
                      </section>
                    </section>
                    <section className="row ">
                      <section className="form-group col-12 col-sm-12 col-md-12">
                        <label htmlFor="overview">Overview*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="overview"
                          name="overview"
                          placeholder="Overview"
                          onChange={this.handleOnChange}
                          values={this.state.overview}
                          required
                          maxLength="100"
                        />
                      </section>
                    </section>

                    <section className="row">
                      <section className="form-group col-12 col-sm-12 col-md-12">
                        <label htmlFor="description">Description*</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Descrption"
                          onChange={this.handleOnChange}
                          values={this.state.description}
                          required
                          maxLength="400"
                        />
                      </section>
                    </section>
                    <section className="row">
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="priority">Priority*</label>
                        <select
                          value={this.state.priority}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="priority"
                          name="priority"
                          required
                        >
                          {this.state.priorityList.map((priorityOption) => (
                            <option key={priorityOption} value={priorityOption}>
                              {priorityOption}
                            </option>
                          ))}
                        </select>
                      </section>
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="owner">Assigned To*</label>
                        <select
                          value={this.state.owner}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="owner"
                          name="owner"
                          required
                        >
                          {this.state.ownerList &&
                            this.state.ownerList.map((ownerOption) => (
                              <option
                                key={ownerOption.name}
                                value={ownerOption.id}
                              >
                                {ownerOption.name}
                              </option>
                            ))}
                        </select>
                      </section>
                    </section>
                    <section className="row">
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="environment">Environment</label>
                        <input
                          type="text"
                          className="form-control"
                          id="environment"
                          name="environment"
                          placeholder="Environment"
                          value={this.state.environment}
                          onChange={this.handleOnChange}
                          maxLength="40"
                        />
                      </section>
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="creator">Tracked By*</label>
                        <select
                          value={this.state.creator}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="creator"
                          name="creator"
                          required
                        >
                          {this.state.creatorList &&
                            this.state.creatorList.map((creatorOption) => (
                              <option
                                key={creatorOption.name}
                                value={creatorOption.id}
                              >
                                {creatorOption.name}
                              </option>
                            ))}
                        </select>
                      </section>
                    </section>
                    <section className="row">
                      {/*<section className="form-group col-12 col-sm-12 col-md-6">
                         <label htmlFor="sprint">Sprint Name</label>
                        <select
                          value={this.state.sprint}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="sprint"
                          name="sprint"
                          required
                        >
                          {this.state.sprintList.map((sprintOption) => (
                            <option
                              key={sprintOption.name}
                              value={sprintOption.id}
                            >
                              {sprintOption.name}
                            </option>
                          ))}
                        </select>
                      </section> */}
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="duedate">Due Date</label>
                        <DatePicker
                          className="form-control"
                          value={this.state.duedate}
                          onChange={this.handleDueDate}
                          name="duedate"
                        />
                      </section>
                    </section>

                    <section className="form-group text-center">
                      <button
                        onClick={this.onCreate}
                        type="submit"
                        className="btn btn-info btn-centre"
                      >
                        Create
                      </button>
                      <button
                        type="submit"
                        className="btn btn-info btn-centre ml-2"
                      >
                        <a style={{ color: "white" }} href="/home">
                          {" "}
                          Close
                        </a>
                      </button>
                    </section>
                  </form>
                </section>
              </section>
            </section>
          </section>
        </section>
        <Modal
          show={this.state.modalFlag}
          onHide={this.handleModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.loading}
          onHide={this.handleLoadingClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Loading</Modal.Title>
          </Modal.Header>
          <Modal.Body>The details are loading please wait....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleLoadingClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default CreateTask;
