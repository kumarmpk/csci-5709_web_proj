import React, { Component } from "react";
import "./ViewProject.css";

class ViewProject extends Component {
  constructor(props) {
    super(props);

    const { projectId } = this.props.match.params;

    //setting default values in the project list
    this.state = {
      projectId: projectId,
      projectList: [
        {
          name: "Project1",
          id: "1",
          manager: "Manager1",
          startDate: "01-Jun-20",
          endDate: "01-Jul-20",
        },
        {
          name: "Project2",
          id: "2",
          manager: "Manager2",
          startDate: "02-Jun-20",
          endDate: "02-Jul-20",
        },
        {
          name: "Project3",
          id: "3",
          manager: "Manager3",
          startDate: "03-Jun-20",
          endDate: "03-Jul-20",
        },
        {
          name: "Project4",
          id: "4",
          manager: "Manager4",
          startDate: "04-Jun-20",
          endDate: "04-Jul-20",
        },
        {
          name: "Project5",
          id: "5",
          manager: "Manager5",
          startDate: "05-Jun-20",
          endDate: "05-Jul-20",
        },
      ],
      project: {},
      modalFlag: false,
    };
  }

  componentDidMount() {}

  //this method is used to close the project and navigate user to home page
  handleClose = (e) => {
    this.props.history.push("/home");
  };

  //this method is used to delete the project and navigate user to home page
  handleDelete = (e) => {
    alert("The project is deleted successfully.");
    this.props.history.push("/home");
  };

  render() {
    let proj = {};
    const projArr = this.state.projectList.filter(
      (c) => c.id === this.state.projectId
    );
    if (projArr && projArr.length) {
      proj = projArr[0];
    }

    return (
      <article className="viewProject">
        <section className="viewProjectForm">
          <section className="viewProjectCard">
            <section className="viewProjectCard-body">
              <form>
                {this.state.validationErrorFlag && (
                  <p className="errorMsg">{this.state.errorMsg}</p>
                )}

                <h3>{proj.name}</h3>
                <section className="mainContent">
                  <main className="form-group">
                    <label>Name</label>
                    <input
                      disabled
                      type="name"
                      name="name"
                      value={proj.name}
                      className="form-control"
                    />
                  </main>

                  <main className="form-group">
                    <label>Id</label>
                    <input
                      disabled
                      type="id"
                      name="id"
                      value={proj.id}
                      className="form-control"
                    />
                  </main>

                  <main className="form-group">
                    <label>Manager</label>
                    <input
                      disabled
                      type="text"
                      name="manager"
                      value={proj.manager}
                      className="form-control"
                    />
                  </main>

                  <main className="form-group">
                    <label>Start Date</label>
                    <input
                      disabled
                      type="date"
                      name="startDate"
                      value={proj.startDate}
                      className="form-control"
                    />
                  </main>

                  <main className="form-group">
                    <label>End Date</label>
                    <input
                      disabled
                      type="date"
                      name="endDate"
                      value={proj.endDate}
                      className="form-control"
                    />
                  </main>

                  <button
                    onClick={this.handleDelete}
                    type="submit"
                    className="viewProjectbutton btn btn-primary"
                    style={{ background: "#2888d1" }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={this.handleClose}
                    type="submit"
                    className=" viewProjectbutton btn btn-primary"
                    style={{ background: "#2888d1" }}
                  >
                    Close
                  </button>
                </section>
              </form>
            </section>
          </section>
        </section>
      </article>
    );
  }
}

export default ViewProject;
