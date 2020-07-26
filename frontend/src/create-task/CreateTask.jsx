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

    this.state = {
      projectList: [],
      project: "",
      typeList: ["Task", "Issue"],
      type: "Task",
      overview: "",
      description: "",
      creatorList: [],
      creator: "",
      priorityList: ["Low", "Medium", "High"],
      priority: "Low",
      environment: "",
      ownerList: [],
      owner: "",
      sprintList: [
        { id: "", name: "Select a sprint" },
        { id: 1, name: "sprint1" },
        { id: 2, name: "sprint2" },
        { id: 3, name: "sprint3" },
      ],
      sprint: "",
      duedate: "",
      validationErrorFlag: false,
      errorMsg: "",
      modalFlag: false,
      id: "",
      loading: false,
      modalRoute: 0,
    };
  }

  componentDidMount() {
    this.fetchAllDetails();
  }

  async fetchAllDetails() {
    this.setState({
      loading: true,
    });
    let url = CONST.URL + "task/user/1";
    await axios
      .get(url)
      .then((res) => {
        let encryp_mess = res.data;

        let dmykey = crypto.createDecipher(
          CONST.encryption_algorithm,
          CONST.encryption_password
        );
        let obj = dmykey.update(encryp_mess, "hex", "utf8");
        obj += dmykey.final("utf8");

        obj = JSON.parse(obj);

        this.setState({
          projectList: obj.project,
          ownerList: obj.user,
          creatorList: obj.user,
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

      const headers = {
        "content-type": "application/json",
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
    this.setState({
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
    });
  };

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
                <section className="col create-section border rounded">
                  <main className="col-sm-12 text-center pt-1 pb-1">
                    {this.state.validationErrorFlag ? (
                      <p style={{ color: "red" }} className="errorMsg">
                        {" "}
                        {this.state.errorMsg}{" "}
                      </p>
                    ) : null}
                  </main>
                  <section className="col-sm-12 text-center pt-2 pb-4">
                    <h3 className="createTitle ">Create</h3>
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
                          {this.state.projectList.map((projectOption) => (
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
                        <label htmlFor="owner">Owner*</label>
                        <select
                          value={this.state.owner}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="owner"
                          name="owner"
                          required
                        >
                          {this.state.ownerList.map((ownerOption) => (
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
                        <label htmlFor="creator">Creator*</label>
                        <select
                          value={this.state.creator}
                          onChange={this.handleOnChange}
                          className="form-control"
                          id="creator"
                          name="creator"
                          required
                        >
                          {this.state.creatorList.map((creatorOption) => (
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
                      <section className="form-group col-12 col-sm-12 col-md-6">
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
                      </section>
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
