import React, { Component } from "react";
import "./Create.css";
import DatePicker from "react-date-picker";
import errMsg from "../errormessages";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectList: [
        { id: "", name: "Select a project" },
        { id: 1, name: "project1" },
        { id: 2, name: "project2" },
        { id: 3, name: "project3" },
      ],
      project: "",
      typeList: ["Task", "Issue"],
      type: "Task",
      overview: "",
      description: "",
      creatorList: [
        { id: "", name: "Select a user" },
        { id: 1, name: "user1" },
        { id: 2, name: "user2" },
        { id: 3, name: "user3" },
      ],
      creator: "",
      priorityList: ["Low", "Medium", "High"],
      priority: "Low",
      environment: "",
      attachment: "",
      ownerList: [
        { id: "", name: "Select a user" },
        { id: 1, name: "user1" },
        { id: 2, name: "user2" },
        { id: 3, name: "user3" },
      ],
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
      modelFlag: false,
      Id: "",
    };
  }

  async createBackendAPICall() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "create";

    try {
      const res = await axios.post(url, JSON.stringify(this.state), config);
      let mess = res.data;

      if (mess === "18" || mess === 18) {
        this.setState({
          modalFlag: true,
          email: "",
          name: "",
          subject: "",
          message: "",
        });
      } else {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg[mess],
        });
      }
    } catch (err) {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["11"],
      });
    }
  }

  onCreate = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
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
      this.state.overview !== "" &&
      this.state.description !== "" &&
      this.state.priority !== "" &&
      this.state.owner !== "" &&
      this.state.creator !== ""
    ) {
      if (this.state.duedate < new Date()) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["20"],
        });
        return;
      }

      this.createBackendAPICall();
    } else {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["13"],
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

  onFileChange = (e) => {
    this.setState({ attachment: e.target.files[0] });
  };

  fileData = () => {
    if (this.state.attachment) {
      return (
        <section>
          <p>Uploaded File Name: {this.state.attachment.name}</p>
          <p>
            Last Modified:{" "}
            {this.state.attachment.lastModifiedDate.toDateString()}
          </p>
        </section>
      );
    }
  };

  handleModalClose = (e) => {
    this.props.history.push("/");
  };

  render() {
    return (
      <section>
        <section className="container fluid pt-4 pb-4">
          <section className="row ">
            <section className="container fluid">
              <section className="row justify-content-center">
                <section className="col create-section border rounded">
                  <main className="col-sm-12 text-center pt-4 pb-4">
                    {this.state.validationErrorFlag ? (
                      <p style={{ color: "red" }} className="errorMsg">
                        {" "}
                        {this.state.errorMsg}{" "}
                      </p>
                    ) : null}
                  </main>
                  <section className="col-sm-12 text-center pt-4 pb-4">
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
                    <section>
                      <section className="form-group col-12 col-sm-12 col-md-6">
                        <label htmlFor="attachment">Attachment</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={this.onFileChange}
                          style={{ marginBottom: "3px" }}
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
        <Modal show={this.state.modalFlag} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The {this.state.type} has been successfully created and can be
            tracked by the Id: {this.state.Id}.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default Create;
