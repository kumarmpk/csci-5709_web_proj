/*author :Japnoor Kaur */
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

var value;

class DocumentsProject extends Component {
  state = {
    projects: [],
    projectName: "",
    projectID: "",
    show: false,
    show2: true,
  };
  //method to get teams for the project
  btnClick = (e) => {
    e.preventDefault();
    /*var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };*/

    var projectID = this.state.projectID;

    // console.log("id=" + projectID);
    axios
      .get("http://localhost:4000/docs/managedocs/" + projectID)
      .then((res) => {
        //console.log(res);
        this.setState({
          docs: res.data,
        });
      });
  };
  //method to set projectID parameter
  setVarVal = (e) => {
    value = this.state.projectID;
    // console.log("id=" + value);
  };

  goBackClick = (e) => {
    e.preventDefault();

    const loc = window;

    loc.history.go(-2);
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    let uid = localStorage.userid;
    //console.log("uid=" + uid);
    axios
      .get("http://localhost:4000/docs/getprojectdocs/" + uid)
      .then((res) => {
        //console.log(res);
        this.setState({
          projects: res.data,
        });
        // console.log("data=" + res.data.length);
        if (res.data.length === 0) {
          this.setState({ show2: !this.state.show2 });
        }
      });
  }

  render() {
    // var v;
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />
                <h3>Document Management</h3>
                <br />
                <form onSubmit={this.btnClick}>
                  <div className="format">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th className="teamTh">
                            Projects (Choose a project to see documents)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ paddingLeft: "25%" }}>
                            <select
                              className="form-control"
                              style={{ width: "70%" }}
                              value={this.state.projectID}
                              onChange={(e) =>
                                this.setState({
                                  projectName: e.target.value,
                                  projectID: e.target.value,
                                })
                              }
                            >
                              <option
                                className="teamDropdown"
                                disabled
                                value=""
                              >
                                Select a project
                              </option>
                              {this.state.projects.map((project) => (
                                <option
                                  key={project.projectName}
                                  value={project.projectID}
                                >
                                  {project.projectName}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <br />

                  {this.state.show2 && (
                    <button
                      className="btn btn-info"
                      type="submit"
                      onClick={this.setVarVal()}
                    >
                      <Link
                        className="teambutton"
                        to={"/docs/managedocs/" + value}
                      >
                        See documents{" "}
                      </Link>{" "}
                    </button>
                  )}
                </form>
                <br />

                <br />
                <br />
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default DocumentsProject;
