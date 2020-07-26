import React, { Component } from "react";
import "../view-project/ViewProject.css";
import errMsg from "../errormessages";
import "./CreateProject.css";
import DatePicker from "react-date-picker";
import { Dropdown, Card, Modal, Button } from "react-bootstrap";
import TeamDummyData from './TeamDummyData';

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
    e.preventDefault();
    console.log("selected:",this.state.selectedTeam);
    

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
      this.state.endDate !== "" &&
      this.state.selectedTeam.name !== undefined
    ) {
      //end date cannot be lesser than start date
      if (this.state.startDate >= this.state.endDate) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["17"],
        });
        return;
      }

      this.setState({
        modalFlag: true,
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
    // console.log("data:", data)
    return (
      <Dropdown.Item eventKey={data.id}>{data.name}</Dropdown.Item>
    )
  }

  onSearchOptionSelect = (id) => {
    const selectedTeam = TeamDummyData.find(e => e.id === Number(id))
    this.setState({ selectedTeam });
  }

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

                  <div className="form-group">
                    <label>Team*</label>
                    <div className="row team-dropdown">
                      <div className="col-5 pl-0" >
                        <Dropdown className="my-auto ml-2 drop-down" onSelect={this.onSearchOptionSelect}>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedTeam.name || 'Select Team'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="select" style={{ display: "none" }} disabled selected>Select Team</Dropdown.Item>
                            {
                              TeamDummyData.length > 0 ?
                                TeamDummyData.map((data) =>
                                  this.getDropDownTeamNames(data)
                                ) : null
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-7">
                        {
                          this.state.selectedTeam.name ? <Card>
                            <div className="cardHeader text-center">
                              <h5>Team Members</h5>
                            </div>
                          <p className="text-center">{this.state.selectedTeam.members.map((name, index) => name + `${index !== this.state.selectedTeam.members.length - 1 ? ", " : "."}`)}</p>
                          </Card> : null
                        }
                      </div>

                    </div>
                  </div>
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
                    <textarea className="form-control  border" aria-label="With textarea" placeholder="Enter project description" />
                  </div>

                  {this.state.validationErrorFlag && (
                    <p className="errorMsg">{this.state.errorMsg}</p>
                  )}

                  <section className="row justify-content-center">
                  <button
                    onClick={this.handleCreate}
                    type="submit"
                      className="createProjectbutton btn btn-info col-7 m-2 text-center"
                  >
                    Create
                  </button>
                  <button
                    onClick={this.handleClose}
                    type="submit"
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

        <Modal show={this.state.modalFlag} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>Project is created successfully.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </article>
    );
  }
}

export default CreateProject;
