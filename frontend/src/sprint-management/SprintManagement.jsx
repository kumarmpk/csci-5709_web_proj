//  Author: Falgun Patel
//  Banner Id:  B00845029
//  javascript file for sprint management page

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

import "./SprintManagement.css";
import axios from "axios";

import { Sprints, Tasks } from './Sprints'

class SprintManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: 1,
      Sprints: [],
      Tasks: [],
      ActiveSprintAvailable: false,
      ActiveSprintOrder: null,
      ActiveSprintID: null,
      MinOrder: null,
      createSprintModalFlag: false,
      deleteSprintModalFlag: false,
      editSprintModalFlag: false,
      editActiveSprintModalFlag: false,
      errorMsg: "",
      serverURL: "http://localhost:4000/sprint/",
      corsHeader: {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
      loading: true,
      editSprintName: "",
      editSprintDescription: "",
      editSprintStartDate: "",
      editSprintEndDate: "",
      editSprintIDModelSelected: null,
    };
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", this.state.Sprints[0]);
  }

  componentWillMount() {
    // URL = "http://localhost:4000/sprint/";
    // var config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    axios
      .post(
        this.state.serverURL + "getSprint",
        { projectID: this.state.projectID },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("________________________", response.data["data"]);
        this.setState({
          Sprints: response.data["data"],
        });
        console.log("res: ", response.data["data"]);

        axios
          .post(
            this.state.serverURL + "getTask",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            this.setState({
              Tasks: response.data["data"],
            });
            console.log("resTask: ", response.data["data"]);
          })
          .then(this.setActiveSprintData)
          .catch((error) => {
            console.log("error2", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error1", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  //set Active sprint data
  setActiveSprintData = () => {
      console.log("datdtadtadtatda@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", this.state.Sprints);
    if (this.state.Sprints[0]) {
      let minOrder = this.state.Sprints[0]["order"];
      let change = false;
      let newData = {};
      this.state.Sprints.map((Sprint) => {
        if (Sprint["isComplete"] == 0) {
          newData["ActiveSprintAvailable"] = true;
          newData["ActiveSprintOrder"] = Sprint["order"];
          newData["ActiveSprintID"] = Sprint["sprintID"];
          change = true;
        }
        if (minOrder > Sprint["order"]) {
          minOrder = Sprint["order"];
        }
      });

      if (!change) {
        newData["ActiveSprintAvailable"] = false;
        newData["ActiveSprintOrder"] = null;
        newData["ActiveSprintID"] = null;
      }
      newData["MinOrder"] = minOrder;
      this.setState({
        ...newData,
      });
      console.log("ACT", this.state["ActiveSprintID"]);
      console.log("ACT", this.state["MinOrder"]);
    }
  };

  //delete sprint
  handleDeleteSprintModalConfirm = (e) => {
    console.log("Sprint Deleted");
    let stemp = []
    let ttemp = []
    console.log(e.target);
    axios
      .post(
        this.state.serverURL + "delete",
        {
          sprintID: this.state.editSprintIDModelSelected,
          projectID: this.state.projectID,
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("res del1", response);
        //fetch sprint
       return axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
      })
      .then((response1) => {
            console.log("spr", response1.data["data"]);
            
            stemp = response1.data["data"];
            // this.setState(
            //   {
            //     Sprints: response.data["data"],
            //   },
            //   () => this.setActiveSprintData()
            // );

            //fetch task
            return axios
              .post(
                this.state.serverURL + "getTask",
                { projectID: this.state.projectID },
                this.state.corsHeader
              )
          })
          .then((response2) => {
                  ttemp = response2.data["data"];
                // this.setState({
                //   Tasks: response2.data["data"],
                // });
                console.log("resTask: ", response2.data["data"]);
              })
    //         //   .then(this.setActiveSprintData)
    //           .catch((error) => {
    //             console.log("error2", error.response.data.msg);
    //             this.setState({
    //               errorMsg: error.response.data.msg,
    //             });
    //           });
    //       .catch((error1) => {
    //         console.log("sprintsprntEEEEEEEEEEEEEEEEE", this.state.Sprints);
    //         console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr", error1);
    //         this.setState({
    //           errorMsg: error1.response.data.msg,
    //         });
    //       });
    // //   .then(this.setActiveSprintData)
      .catch((error2) => {
        console.log("error1", error2);
        this.setState({
          errorMsg: error2.response.data.msg,
        });
      })
      .finally(() => (
          this.setState({
              Sprints: stemp,
              Tasks: ttemp,
            editSprintName: "",
            editSprintDescription: "",
            editSprintStartDate: "",
            editSprintEndDate: "",
            ActiveSprintAvailable: false,
            deleteSprintModalFlag: false,
          }, () => this.setActiveSprintData()))
      );
      
    console.log("sprint deleted: ",this.state);
  };

  handleDeleteSprintModalOpen = (sprintID) => {
      this.setState({
        editSprintIDModelSelected: sprintID,
        deleteSprintModalFlag: true,
      });
  };

  handleDeleteSprintModalClose = () => {
    this.setState({
      deleteSprintModalFlag: false,
    });
  };

  //Edit
  handleEditSprintModalUpdate = () => {
    console.log("Sprint Edited");

    axios
      .put(
        this.state.serverURL + "modifySprint",
        {
          sprintname: this.state.editSprintName,
          description: this.state.editSprintDescription,
          projectID: this.state.projectID,
          sprintID: this.state.editSprintIDModelSelected,
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("________________________", response.data["data"]);
        //get new sprint data
        axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("spr", response.data["data"]);
            this.setState({
              Sprints: response.data["data"],
            });
          })
          .catch((error) => {
            // console.log("error2", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error1", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });
    this.setState({
      editSprintName: "",
      editSprintDescription: "",
      editSprintModalFlag: false,
    });
  };

  handleEditSprintModalOpen = (sprintID) => {
    console.log("id", sprintID);
    this.setState({
      // temp_s:
      editSprintName: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["sprintname"],
      editSprintDescription: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["description"],
      editSprintIDModelSelected: sprintID,
      editSprintModalFlag: true,
    });
  };

  setEditSprintNameModal = (e) => {
    this.setState({
      editSprintName: e.target.value,
    });

    console.log("Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.editSprintName);
  };

  setEditSprintDescModal = (e) => {
    this.setState({
      editSprintDescription: e.target.value,
    });
  };

  handleEditSprintModalClose = () => {
    this.setState({
      editSprintModalFlag: false,
    });
  };

  //Edit Active
  handleEditActiveSprintModalUpdate = () => {
    console.log("Active Sprint Edited");

    axios
      .put(
        this.state.serverURL + "modifyActive",
        {
          sprintname: this.state.editSprintName,
          description: this.state.editSprintDescription,
          startdate: this.state.editSprintStartDate,
          enddate: this.state.editSprintEndDate,
          projectID: this.state.projectID,
          sprintID: this.state.ActiveSprintID,
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("________________________", response.data["data"]);
        //get new sprint data
        axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("spr", response.data["data"]);
            this.setState({
              Sprints: response.data["data"],
            });
          })
          .catch((error) => {
            // console.log("error2", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error1", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });
    this.setState({
      editSprintName: "",
      editSprintDescription: "",
      editActiveSprintModalFlag: false,
    });
  };

  handleEditActiveSprintModalOpen = () => {
    this.setState({
      editSprintName: this.state.Sprints.find(
        (ele) => ele.sprintID === this.state.ActiveSprintID
      )["sprintname"],
      editSprintDescription: this.state.Sprints.find(
        (ele) => ele.sprintID === this.state.ActiveSprintID
      )["description"],
      editSprintStartDate: this.state.Sprints.find(
        (ele) => ele.sprintID === this.state.ActiveSprintID
      )["startdate"],
      editSprintEndDate: this.state.Sprints.find(
        (ele) => ele.sprintID === this.state.ActiveSprintID
      )["enddate"],
      editSprintIDModelSelected: this.state.ActiveSprintID,
      editActiveSprintModalFlag: true,
    });
  };

  setEditActiveSprintStartDateModal = (e) => {
    this.setState({
      editSprintStartDate: e.target.value,
    });
  };

  setEditActiveSprintEndDateModal = (e) => {
    this.setState({
      editSprintEndDate: e.target.value,
    });
  };

  handleEditActiveSprintModalClose = () => {
    this.setState({
      editActiveSprintModalFlag: false,
    });
  };

  //Start Sprint
  handleStartSprintModalStart = () => {
    console.log("Active Sprint Edited", this.state.editSprintIDModelSelected);

    axios
      .post(
        this.state.serverURL + "startSprint",
        {
          sprintname: this.state.editSprintName,
          description: this.state.editSprintDescription,
          startdate: this.state.editSprintStartDate,
          enddate: this.state.editSprintEndDate,
          projectID: this.state.projectID,
          sprintID: this.state.editSprintIDModelSelected,
          duration: null
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("________________________", response.data["data"]);
        //get new sprint data
        axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("spr", response.data["data"]);
            this.setState({
              Sprints: response.data["data"],
            });
          })
          .then(this.setActiveSprintData)
          .catch((error) => {
            // console.log("error2", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error1", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });
    this.setState({
      editSprintName: "",
      editSprintDescription: "",
      editSprintStartDate: "",
      editSprintEndDate: "",
      startSprintModalFlag: false,
    });
  };

  handleStartSprintModalOpen = (sprintID) => {
    this.setState({
      // temp_s:
      editSprintName: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["sprintname"],
      editSprintDescription: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["description"],
      editSprintStartDate: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["startdate"],
      editSprintEndDate: this.state.Sprints.find(
        (ele) => ele.sprintID === sprintID
      )["enddate"],
      editSprintIDModelSelected: sprintID,
      startSprintModalFlag: true,
    });
  };

  handleStartSprintModalClose = () => {
    this.setState({
      startSprintModalFlag: false,
    });
  };

  //create modal
  handleCreateSprintModalCreate = (e) => {
    console.log(e.target);
    axios
      .post(
        this.state.serverURL + "create",
        { sprintname: this.state.editSprintName, description: this.state.editSprintDescription, projectID: this.state.projectID},
        this.state.corsHeader
      )
      .then((response) => {
        axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("spr", response.data["data"]);
            this.setState({
              Sprints: response.data["data"],
            });
          })
          .then(this.setActiveSprintData)
          .catch((error) => {
            // console.log("error2", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        // console.log("error1", error);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });

    this.setState({
      createSprintModalFlag: false,
    });
  };

  handleCreateSprintModalOpen = (sprintID) => {
    this.setState({
      createSprintModalFlag: true,
    });
  };

  handleCreateSprintModalClose = () => {
    this.setState({
      createSprintModalFlag: false,
    });
  };

  //End Sprint
  handleEndActiveSprint = () => {
    axios
      .put(
        this.state.serverURL + "endSprint",
        { sprintID: this.state.ActiveSprintID, projectID: this.state.projectID },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("res del1", response);
        //fetch sprint
        axios
          .post(
            this.state.serverURL + "getSprint",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("spr", response.data["data"]);
            this.setState({
              Sprints: response.data["data"],
            });
            //fetch task
            axios
              .post(
                this.state.serverURL + "getTask",
                { projectID: this.state.projectID },
                this.state.corsHeader
              )
              .then((response) => {
                this.setState({
                  Tasks: response.data["data"],
                });
                console.log("resTask: ", response.data["data"]);
              })
              .then(this.setActiveSprintData)
              .catch((error) => {
                console.log("error2", error.response.data.msg);
                this.setState({
                  errorMsg: error.response.data.msg,
                });
              });
          })
          .catch((error) => {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", error.response);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error1", error);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });

      this.setState({
        editSprintName: "",
        editSprintDescription: "",
        editSprintStartDate: "",
        editSprintEndDate: "",
        ActiveSprintAvailable: false,
        ActiveSprintOrder: null,
        ActiveSprintID: null,
        startSprintModalFlag: false,
      });
  };

  //Drag and drop
  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDragStart = (ev, id) => {
    console.log("dragstart: ", id);
    ev.dataTransfer.setData("taskid", id);
  };

  onDrop = (ev, sprintid) => {
    let taskid = Number(ev.dataTransfer.getData("taskid"));
    console.log("Drop: ", taskid);
    axios
      .put(
        this.state.serverURL + "modifyTaskSprint",
        {
          projectID: this.state.projectID,
          taskID: taskid,
          newSprintID: sprintid,
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("resTask: ", response.data["data"]);
        //get new tasks details
        axios
          .post(
            this.state.serverURL + "getTask",
            { projectID: this.state.projectID },
            this.state.corsHeader
          )
          .then((response) => {
            this.setState({
              Tasks: response.data["data"],
            });
            console.log("resTask: ", response.data["data"]);
          })
          .then(this.setActiveSprintData)
          .catch((error) => {
            console.log("error_fetch_task_modify", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error_modify_sprint_task", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });
  };

  onDropActive = (ev, actSprintId, status) => {
    let taskid = Number(ev.dataTransfer.getData("taskid"));
    console.log("Drop: ", taskid);
    // let tasks = this.state.Tasks.filter((task) => {
    //   if (task.taskid == taskid) {
    //     task.sprintid = actSprintId;
    //     task.status = status;
    //   }
    //   return task;
    // });

    axios
      .put(
        this.state.serverURL + "modifyTaskSprint",
        {
          projectID: this.state.projectID,
          taskID: taskid,
          newSprintID: actSprintId,
        },
        this.state.corsHeader
      )
      .then((response) => {
        console.log("resTask: ", response.data["data"]);
        //get new tasks details
        axios
          .put(
            this.state.serverURL + "modifyTaskStatus",
            {
              projectID: this.state.projectID,
              taskID: taskid,
              sprintID: actSprintId,
              newStatus: status,
            },
            this.state.corsHeader
          )
          .then((response) => {
            console.log("resTask: ", response.data["data"]);
            //get new tasks details
            axios
              .post(
                this.state.serverURL + "getTask",
                { projectID: this.state.projectID },
                this.state.corsHeader
              )
              .then((response) => {
                this.setState({
                  Tasks: response.data["data"],
                });
                console.log("resTask: ", response.data["data"]);
              })
              .then(this.setActiveSprintData)
              .catch((error) => {
                console.log("error_fetch_task_modify", error.response.data.msg);
                this.setState({
                  errorMsg: error.response.data.msg,
                });
              });
          })
          .catch((error) => {
            console.log("error_modify_status_task", error.response.data.msg);
            this.setState({
              errorMsg: error.response.data.msg,
            });
          });
      })
      .catch((error) => {
        console.log("error_modify_sprint_task", error.response.data.msg);
        this.setState({
          errorMsg: error.response.data.msg,
        });
      });
    console.log("latest: ", this.state.Tasks);
  };

  render() {
    if (this.state.errorMsg != "") {
      alert(this.state.errorMsg);
    }
    if (this.state.loading) {
      return <section>Fetching Data</section>;
    }
    console.log(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      this.state.ActiveSprintAvailable
    );
    return (
      <section>
        {this.state.ActiveSprintAvailable == true ? (
          <section className="row mt-4 mx-4">
            <section className="col-12">
              <section className="sprint border rounded p-2">
                {console.log(
                  "latest$$$$$$$$$$$$$$$$$$$$$ ",
                  this.state.ActiveSprintAvailable
                )}
                <span className="task-header">
                  Active Sprint:
                  {this.state.ActiveSprintAvailable
                    ? this.state.Sprints.find(
                        (ele) => ele.sprintID === this.state.ActiveSprintID
                      )["sprintname"]
                    : null}
                </span>
                <button
                  type="button"
                  className="mr-2 float-right"
                  onClick={() =>
                    this.handleDeleteSprintModalOpen(this.state.ActiveSprintID)
                  }
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mr-2 float-right"
                  onClick={() => this.handleEndActiveSprint()}
                >
                  End Sprint
                </button>
                <button
                  type="button"
                  className="mr-2 float-right"
                  onClick={() => this.handleEditActiveSprintModalOpen()}
                >
                  Edit
                </button>
              </section>
            </section>
            <section className="col-4">
              <section className="todo border rounded p-2">
                <span className="task-header">To Do</span>
              </section>
              <section
                className="min-vh-25 border rounded"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) =>
                  this.onDropActive(e, this.state.ActiveSprintID, null)
                }
              >
                {this.state.Tasks.map((Task) =>
                  Task["sprintid"] == this.state.ActiveSprintID &&
                  Task["status"] == null ? (
                    <section
                      className="task draggable"
                      onDragStart={(e) => this.onDragStart(e, Task["taskid"])}
                      draggable
                    >
                      <span className="task-header">{Task["overview"]}</span>
                    </section>
                  ) : null
                )}
              </section>
            </section>
            <section className="col-4">
              <section className="inprogress border rounded p-2">
                <span className="task-header">In Progress</span>
              </section>
              <section
                className="min-vh-25 border rounded"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) =>
                  this.onDropActive(e, this.state.ActiveSprintID, 0)
                }
              >
                {this.state.Tasks.map((Task) =>
                  Task["sprintid"] == this.state.ActiveSprintID &&
                  Task["status"] == 0 ? (
                    <section
                      className="task draggable"
                      onDragStart={(e) => this.onDragStart(e, Task["taskid"])}
                      draggable
                    >
                      <span className="task-header">{Task["overview"]}</span>
                    </section>
                  ) : null
                )}
              </section>
            </section>
            <section className="col-4">
              <section className="done border rounded p-2">
                <span className="task-header">Done</span>
              </section>
              <section
                className="min-vh-25 border rounded"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) =>
                  this.onDropActive(e, this.state.ActiveSprintID, 1)
                }
              >
                {this.state.Tasks.map((Task) =>
                  Task["sprintid"] == this.state.ActiveSprintID &&
                  Task["status"] == 1 ? (
                    <section
                      className="task draggable"
                      onDragStart={(e) => this.onDragStart(e, Task["taskid"])}
                      draggable
                    >
                      <span className="task-header">{Task["overview"]}</span>
                    </section>
                  ) : null
                )}
              </section>
            </section>
          </section>
        ) : null}

        {/* Sprint 1 */}
        {this.state.Sprints.map((Sprint) =>
          Sprint["isComplete"] == null ? (
            <section className="row mt-4 mx-4">
              <section className="col-12">
                <section className="sprint border rounded p-2">
                  <span className="task-header">{Sprint["sprintname"]}</span>
                  {/* <FontAwesomeIcon
                    icon={faArrowDown}
                    size="x"
                    className="mr-2 float-right"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    size="x"
                    className="mr-2 float-right"
                  /> */}
                  <button
                    type="button"
                    className="mr-2 float-right"
                    onClick={() =>
                      this.handleDeleteSprintModalOpen(Sprint["sprintID"])
                    }
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mr-2 float-right"
                    onClick={() =>
                      this.handleEditSprintModalOpen(Sprint["sprintID"])
                    }
                  >
                    Edit
                  </button>
                  {console.log(
                    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  " +
                      this.state.MinOrder +
                      "    " +
                      Sprint["order"]
                  )}
                  {this.state.ActiveSprintAvailable == false &&
                  Sprint["order"] == this.state.MinOrder ? (
                    <button
                      type="button"
                      className="mr-2 float-right"
                      onClick={() =>
                        this.handleStartSprintModalOpen(Sprint["sprintID"])
                      }
                    >
                      Start Sprint
                    </button>
                  ) : null}
                </section>
                <section
                  className="min-vh-25 border rounded"
                  onDragOver={(e) => this.onDragOver(e)}
                  onDrop={(e) => this.onDrop(e, Sprint["sprintID"])}
                >
                  {this.state.Tasks.map((Task) =>
                    Task["sprintid"] == Sprint["sprintID"] ? (
                      <section
                        className="task draggable"
                        onDragStart={(e) => this.onDragStart(e, Task["taskid"])}
                        draggable
                      >
                        <span className="task-header">{Task["overview"]}</span>
                      </section>
                    ) : null
                  )}
                </section>
              </section>
            </section>
          ) : null
        )}

        {/* Remaining task/issues */}
        <section className="row mt-4 mx-4">
          <section className="col-12">
            <section className="sprint border rounded p-2">
              <span className="task-header">Remaining Task/Issues</span>
              <button
                type="button"
                className="mr-2 float-right"
                onClick={this.handleCreateSprintModalOpen}
              >
                Create Sprint
              </button>
            </section>
            <section
              className="min-vh-25 border rounded"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, null)}
            >
              {this.state.Tasks.map((Task) =>
                Task["sprintid"] == null ? (
                  <section
                    className="task draggable"
                    onDragStart={(e) => this.onDragStart(e, Task["taskid"])}
                    draggable
                  >
                    <span className="task-header">{Task["overview"]}</span>
                  </section>
                ) : null
              )}
            </section>
          </section>
        </section>

        <Modal show={this.state.createSprintModalFlag} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Sprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sprint Name:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={this.setEditSprintNameModal}
              />
            </InputGroup>
            Description:
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                onChange={this.setEditSprintDescModal}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleCreateSprintModalCreate}
            >
              Create
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleCreateSprintModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editSprintModalFlag} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sprint Name:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                //   value="Sahil"
                defaultValue={
                  this.state.editSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) =>
                          ele.sprintID === this.state.editSprintIDModelSelected
                      )["sprintname"]
                    : null
                }
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={this.setEditSprintNameModal}
              />
            </InputGroup>
            Description:
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                defaultValue={
                  this.state.editSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) =>
                          ele.sprintID === this.state.editSprintIDModelSelected
                      )["description"]
                    : null
                }
                onChange={this.setEditSprintDescModal}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleEditSprintModalUpdate}
            >
              Update
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleEditSprintModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editActiveSprintModalFlag} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sprint name:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.editActiveSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.sprintID === this.state.ActiveSprintID
                      )["sprintname"]
                    : null
                }
                onChange={this.setEditSprintNameModal}
              />
            </InputGroup>
            Start date:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.editActiveSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.sprintID === this.state.ActiveSprintID
                      )["startdate"]
                    : null
                }
                onChange={this.setEditActiveSprintStartDateModal}
              />
            </InputGroup>
            End date:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.editActiveSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.sprintID === this.state.ActiveSprintID
                      )["enddate"]
                    : null
                }
                onChange={this.setEditActiveSprintEndDateModal}
              />
            </InputGroup>
            Description:
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                defaultValue={
                  this.state.editActiveSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.sprintID === this.state.ActiveSprintID
                      )["description"]
                    : null
                }
                onChange={this.setEditSprintDescModal}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleEditActiveSprintModalUpdate}
            >
              Update
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleEditActiveSprintModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.deleteSprintModalFlag} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete sprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.deleteSprintModalFlag && this.state.Sprints.length
              ? "Do you want to delete Sprint: " +
                this.state.Sprints.find(
                  (ele) => ele.sprintID === this.state.editSprintIDModelSelected
                )["sprintname"]
              : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleDeleteSprintModalConfirm}
            >
              Confirm
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleDeleteSprintModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.startSprintModalFlag} centered>
          {console.log(
            "##################################",
            this.state.MinOrder
          )}
          <Modal.Header closeButton>
            <Modal.Title>Start Sprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sprint name:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.startSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.order === this.state.MinOrder
                      )["sprintname"]
                    : null
                }
                onChange={this.setEditSprintNameModal}
              />
            </InputGroup>
            Start date:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.startSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.order === this.state.MinOrder
                      )["startdate"]
                    : null
                }
                onChange={this.setEditActiveSprintStartDateModal}
              />
            </InputGroup>
            End date:
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={
                  this.state.startSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.order === this.state.MinOrder
                      )["enddate"]
                    : null
                }
                onChange={this.setEditActiveSprintEndDateModal}
              />
            </InputGroup>
            Description:
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                defaultValue={
                  this.state.startSprintModalFlag
                    ? this.state.Sprints.find(
                        (ele) => ele.order === this.state.MinOrder
                      )["description"]
                    : null
                }
                onChange={this.setEditSprintDescModal}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleStartSprintModalStart()}
            >
              Start
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleStartSprintModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>   
      </section>
    );
  }
}

export default SprintManagement;