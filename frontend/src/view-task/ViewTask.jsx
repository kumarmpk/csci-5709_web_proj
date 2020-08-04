//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  View Task page

import React, { Component } from "react";
import "./ViewTask.css";
import DatePicker from "react-date-picker";
import errMsg from "../errormessages";
import CONST from "../constants";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import crypto from "crypto";
import user_icon from "../img/avatardefault_92824.png";

class ViewTask extends Component {
  constructor(props) {
    super(props);

    if (!this.props.location.state) {
      this.props.history.push("/NotFound");
      return;
    }

    let userId;
    let userRole;
    if (localStorage && localStorage.userid) {
      userId = localStorage.userid;
      userRole = localStorage.role;
    }

    this.state = {
      taskid: "",
      projectList: [],
      projectid: "",
      type: "",
      overview: "",
      description: "",
      creator: "",
      priority: "",
      environment: "",
      owner: "",
      sprintid: "",
      duedate: "",
      priorityList: ["Low", "Medium", "High"],
      ownerList: [],
      creatorList: [],
      sprintList: [{ id: "", name: "Select a sprint" }],
      validationErrorFlag: false,
      errorMsg: "",
      modelFlag: false,
      modalMsg: "",
      modalRoute: 0,
      loading: false,
      status: "",
      statusList: [
        { id: "", value: "Created" },
        { id: "0", value: "In Progress" },
        { id: "1", value: "Completed" },
      ],
      blobData: "",
      commentList: [],
      comment: "",
      userId: userId,
      userRole: userRole,
      createdBy: "",
    };
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

  async componentDidMount() {
    if (!this.props.location.state) {
      return;
    }

    let taskid = this.props.location.state.taskid;

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    this.setState({
      loading: true,
      taskid: taskid,
    });

    if (taskid) {
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
              modalRoute: 2,
              modalMsg: errMsg["35"],
            });
          }

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

      let url2 = CONST.URL + `task/${taskid}`;

      await axios
        .get(url2, config)
        .then(async (res) => {
          let decrypObj = this.decryptFunc(res.data);

          if (decrypObj === 40 || decrypObj === "40") {
            this.setState({
              loading: false,
              modalMsg: errMsg["27"],
              modalFlag: true,
              modalRoute: 1,
            });
            return;
          }

          if (decrypObj && Object.keys(decrypObj).length) {
            Object.keys(decrypObj).forEach((key) => {
              if (decrypObj[key] !== null) {
                this.setState({
                  [key]: decrypObj[key],
                });
              }
            });

            let url3 =
              CONST.URL +
              `task/${decrypObj.projectid}/${this.state.userId}/${this.state.userRole}`;

            await axios
              .get(url3)
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

            if (this.state.duedate) {
              let date = this.state.duedate;
              date = new Date(date);
              this.setState({
                duedate: date,
              });
            }

            this.setState({
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
              modalMsg: errMsg["10"],
              modalFlag: true,
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            let data = this.decryptFunc(err.response.data);
            if (data === "19") {
              this.setState({
                modalFlag: true,
                modalMsg: errMsg["19"],
                modalRoute: 1,
                loading: false,
              });
            } else {
              this.setState({
                modalFlag: true,
                modalMsg: errMsg["27"],
                modalRoute: 1,
                loading: false,
              });
            }
          } else {
            this.setState({
              validationErrorFlag: true,
              errorMsg: errMsg["11"],
              modalFlag: true,
              modalMsg: errMsg["11"],
              loading: false,
            });
          }
        });
    } else {
      this.setState({
        loading: false,
        modalMsg: errMsg["28"],
        modalFlag: true,
        modalRoute: 2,
      });
    }
  }

  encrypFunc(input) {
    let key = crypto.createCipher(
      CONST.encryption_algorithm,
      CONST.encryption_password
    );
    let output = key.update(JSON.stringify(input), "utf8", "hex");
    output += key.final("hex");
    return output;
  }

  async createBackendAPICall() {
    try {
      let backendObj = {};
      backendObj.project = this.state.projectid;
      backendObj.type = this.state.type;
      backendObj.overview = this.state.overview;
      backendObj.description = this.state.description;
      backendObj.priority = this.state.priority;
      backendObj.owner = this.state.owner;
      backendObj.environment = this.state.environment;
      backendObj.creator = this.state.creator;
      backendObj.sprintid = this.state.sprintid;
      backendObj.duedate = this.state.duedate;
      backendObj.taskid = this.state.taskid;
      backendObj.comment = this.state.comment;
      backendObj.status = this.state.status;
      backendObj.userId = this.state.userId;

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      console.log("backendObj", backendObj);

      let encryp_backendObj = this.encrypFunc(backendObj);

      let url = CONST.URL + "task";

      await axios
        .put(
          url,
          { data: encryp_backendObj },
          {
            headers,
          }
        )
        .then((res) => {
          let mess = this.decryptFunc(res.data);

          if (mess === "30" || mess === 30) {
            this.setState({
              modalFlag: true,
              modalMsg: `The ${this.state.type} has been successfully updated.`,
              loading: false,
              modalRoute: 2,
            });
          } else {
            this.setState({
              validationErrorFlag: true,
              errorMsg: errMsg[mess],
              loading: false,
              modalFlag: true,
              modalMsg: errMsg[mess],
            });
          }
        })
        .catch((err) => {
          this.setState({
            validationErrorFlag: true,
            errorMsg: errMsg["11"],
            modalFlag: true,
            modalMsg: errMsg["11"],
            loading: false,
          });
        });
    } catch (err) {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["11"],
        modalFlag: true,
        modalMsg: errMsg["11"],
        loading: false,
      });
    }
  }

  async deleteBackendAPICall() {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let url = CONST.URL + `task/${this.state.taskid}`;

    let res = await axios.delete(url, {
      headers,
    });

    let mess = this.decryptFunc(res.data);

    if (mess === "29" || mess === 29) {
      this.setState({
        loading: false,
        modalFlag: true,
        modalMsg: `The ${this.state.type} is deleted successfully.`,
        modalRoute: 2,
      });
    } else {
      this.setState({
        loading: false,
        modalFlag: true,
        errMsg: errMsg[mess],
        modalMsg: errMsg[mess],
      });
    }
  }

  onDelete = (e) => {
    e.preventDefault();

    try {
      this.setState({
        validationErrorFlag: false,
        errorMsg: "",
        loading: true,
      });

      this.deleteBackendAPICall();
    } catch (e) {
      this.setState({
        loading: false,
        errorMsg: errMsg["11"],
        validationErrorFlag: true,
        modalFlag: true,
        modalMsg: errMsg["11"],
      });
    }
  };

  onUpdate = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
      loading: true,
    });

    if (
      this.state &&
      this.state.projectid &&
      this.state.overview &&
      this.state.description &&
      this.state.owner &&
      this.state.creator &&
      this.state !== {} &&
      this.state.projectid !== "" &&
      this.state.overview.trim() !== "" &&
      this.state.description.trim() !== "" &&
      this.state.owner !== "" &&
      this.state.creator !== ""
    ) {
      if (this.state.duedate && this.state.duedate < new Date()) {
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
        loading: false,
      });
    }
  };

  handleLoadingClose = (e) => {
    this.setState({ loading: false });
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

  handleComments = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClose = (e) => {
    this.props.history.push("/home");
  };

  handleModalClose = (e) => {
    if (this.state.modalRoute === 1) {
      this.props.history.push("/search");
    } else if (this.state.modalRoute === 2) {
      this.props.history.push("/home");
    } else {
      this.setState({
        modalFlag: false,
        loading: false,
      });
    }
  };

  render() {
    const dateString = "Date: ";

    const showDelete = this.state.userRole !== "developer";

    return (
      <section>
        {this.state ? (
          <section className="container fluid pt-2 pb-4">
            <section className="row ">
              <section className="container fluid">
                <section className="row justify-content-center">
                  <section className="col create-section">
                    <main className="col-sm-12 text-center pt-1 pb-1">
                      {this.state && this.state.validationErrorFlag ? (
                        <p style={{ color: "red" }} className="errorMsg">
                          {" "}
                          {this.state.errorMsg}{" "}
                        </p>
                      ) : null}
                    </main>
                    <section className="col-sm-12 text-center pt-2 pb-4">
                      <h3 className="createTitle ">View Task</h3>
                    </section>

                    <form className="form-container">
                      <text style={{ marginLeft: "0.8em", fontSize: "0.8em" }}>
                        &nbsp;Created By: {this.state.createdBy}
                      </text>
                      <section className="row ">
                        <section className="form-group col-12 col-sm-12 col-md-4">
                          <label htmlFor="projectid"> Project* </label>

                          <select
                            value={this.state.projectid}
                            className="form-control"
                            id="projectid"
                            name="projectid"
                            disabled
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
                        <section className="form-group col-12 col-sm-12 col-md-4">
                          <label htmlFor="type">Type*</label>
                          <input
                            value={this.state.type}
                            onChange={this.handleOnChange}
                            className="form-control"
                            id="type"
                            name="type"
                            disabled
                          />
                        </section>
                        <section className="form-group col-12 col-sm-12 col-md-4">
                          <label htmlFor="owner">Status*</label>
                          <select
                            value={this.state.status}
                            onChange={this.handleOnChange}
                            className="form-control"
                            id="status"
                            name="status"
                            required
                          >
                            {this.state.statusList &&
                              this.state.statusList.map((statusOption) => (
                                <option
                                  key={statusOption.value}
                                  value={statusOption.id}
                                >
                                  {statusOption.value}
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
                            value={this.state.overview}
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
                            value={this.state.description}
                            required
                            maxLength="400"
                          />
                        </section>
                      </section>
                      <section className="row">
                        <section className="form-group col-12 col-sm-12 col-md-4">
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
                              <option
                                key={priorityOption}
                                value={priorityOption}
                              >
                                {priorityOption}
                              </option>
                            ))}
                          </select>
                        </section>
                        <section className="form-group col-12 col-sm-12 col-md-4">
                          <label htmlFor="owner">Assigned To*</label>
                          <select
                            onChange={this.handleOnChange}
                            value={this.state.owner}
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
                        <section className="form-group col-12 col-sm-12 col-md-4">
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
                      </section>
                      <section className="row">
                        <section className="form-group col-12 col-sm-12 col-md-4">
                          <label htmlFor="creator">Tracked By*</label>
                          <select
                            value={this.state.creator}
                            className="form-control"
                            id="creator"
                            name="creator"
                            disabled
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
                        {/*<section className="form-group col-12 col-sm-12 col-md-4">
                           <label htmlFor="sprintid">Sprint Name</label>
                          <select
                            value={this.state.sprintid}
                            onChange={this.handleOnChange}
                            className="form-control"
                            id="sprintid"
                            name="sprintid"
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
                        </section>*/}
                        <section className="form-group col-12 col-sm-12 col-md-4">
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
                          onClick={this.onUpdate}
                          type="submit"
                          className="btn btn-info btn-centre mt-4"
                        >
                          Update
                        </button>
                        {showDelete ? (
                          <button
                            onClick={this.onDelete}
                            type="submit"
                            className="btn btn-info btn-centre ml-3 mt-4"
                          >
                            Delete
                          </button>
                        ) : null}
                        <button
                          onClick={this.onClose}
                          type="submit"
                          className="btn btn-info btn-centre ml-3 mt-4"
                        >
                          Close
                        </button>
                      </section>
                      <section className="form-group ">
                        <section className="form-group col-12 col-sm-12 col-md-12">
                          <h5 htmlFor="comment">Comments</h5>
                        </section>
                        <section className="form-group col-12 col-sm-12 col-md-12">
                          <textarea
                            type="text"
                            className="form-control"
                            id="comment"
                            name="comment"
                            placeholder="Comment"
                            onChange={this.handleComments}
                            value={this.state.comment}
                            maxLength="120"
                          />
                        </section>
                      </section>

                      <section className="row">
                        {this.state.commentList.length > 0 ? (
                          <section className="form-group col-12 col-sm-12 col-md-12">
                            {this.state.commentList.map((comment) => {
                              return (
                                <section
                                  key={Math.random()}
                                  className="form-group col-12 col-sm-12 col-md-12 "
                                >
                                  <img
                                    src={user_icon}
                                    width="18"
                                    height="18"
                                    alt="logo"
                                  />
                                  <text style={{ fontSize: "0.8em" }}>
                                    &nbsp;Name: {comment.userName}
                                    <br />
                                    {dateString}
                                    {comment.date}
                                  </text>
                                  <br />
                                  {comment.comment}
                                </section>
                              );
                            })}
                          </section>
                        ) : (
                          <section></section>
                        )}{" "}
                      </section>
                    </form>
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
                <Modal.Title>Update</Modal.Title>
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
        ) : null}
      </section>
    );
  }
}

export default ViewTask;
