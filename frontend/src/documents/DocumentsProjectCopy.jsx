/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CONST from "../constants";
import "./Documents.css";

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

    var projectID = this.state.projectID;

    const res = axios
      .get("http://localhost:4000/docs/managedocs/" + projectID)
      .then((res) => {
        this.setState({
          docs: res.data,
        });
      });
  };
  //method to set projectID parameter
  setVarVal = (e) => {
    value = this.state.projectID;
  };

  goBackClick = (e) => {
    e.preventDefault();

    const loc = window;

    loc.history.go(-2);
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    let uId = localStorage.userid;
    axios
      .get("http://localhost:4000/docs/getAllProjDocs/" + uId)
      .then((res) => {
        this.setState({
          projects: res.data,
        });
        if (res.data.length === 0) {
          this.setState({ show2: !this.state.show2 });
        }
      });
  }

  render() {
    // var v;
    return (
      <article>
        <main className="documentForm">
          <div>
            <div>
              <div>
                <br />
                <h3>Document Management</h3>

                {this.state.show2 && (
                  <div className="teambutton">
                    <a
                      className="teambutton"
                      href="/docs/createdoc"
                      className="btn btn-info"
                      style={{
                        marginTop: "1em",
                        marginBottom: "1em",
                      }}
                    >
                      Create a new Document
                    </a>
                  </div>
                )}
                <br />
                <form onSubmit={this.btnClick}>
                  <br />
                  <div className="container bordered round ">
                    <div className="row mx-lg-n5">
                      <div className="col py-3 px-lg-5 border  ">
                        <h5>Project</h5>
                      </div>
                      <div className="col py-3 px-lg-5 border ">
                        <h5>Document</h5>
                      </div>
                      <div className="col py-3 px-lg-5 border ">
                        <h5>Created Date</h5>
                      </div>
                      <div className="col py-3 px-lg-5 border ">
                        <h5>Last Modified Date</h5>
                      </div>
                    </div>

                    {this.state.projects &&
                      this.state.projects.map((project) => (
                        <div className="row mx-lg-n5">
                          <div className="col py-3 px-lg-5 border ">
                            {project.projectName}
                          </div>
                          <div className="col py-3 px-lg-5 border ">
                            <a href={"/docs/updatedocs/" + project.documentID}>
                              {project.documentName}
                            </a>
                          </div>
                          <div className="col py-3 px-lg-5 border ">
                            {project.createDate}
                          </div>
                          <div className="col py-3 px-lg-5 border ">
                            {project.modifiedDate}
                          </div>
                        </div>
                      ))}

                    <br />
                    <br />
                  </div>
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
