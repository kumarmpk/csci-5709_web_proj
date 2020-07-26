/*author :Japnoor Kaur */

import React, { Component, useState } from "react";
import axios from "axios";
import "./Team.css";
import { Modal } from "react-bootstrap";

class Team extends Component {
  state = {
    teams: [],
    show: false,
  };

  //get the path variable from the URL
  getParam = () => {
    let pathandQuery = (
      window.location.pathname + window.location.search
    ).substr(1);
    var arr = [];
    var f;
    var finalf;
    const urlParams = new URLSearchParams(pathandQuery);
    f = pathandQuery.lastIndexOf;
    var arr = pathandQuery.split("/");
    for (var i = 0; i < f.length; i++) {
      arr[i] = pathandQuery.split("/");
    }
    finalf = arr[arr.length - 1];

    const project1 = urlParams.get("projectId");
    return finalf;
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    const r = this.getParam();
    axios.get("http://localhost:4000/teams/manageteams/" + r).then((res) => {
      //console.log(res);
      this.setState({
        teams: res.data,
      });
    });
  }

  //method to delete team
  btnDelete = (id) => (e) => {
    e.preventDefault();
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = axios
      .delete("http://localhost:4000/teams/deleteteam/" + id)
      .then((res) => {
        console.log(res);
      });

    this.handleModal();
  };

  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
      window.location.reload();
    }
  };
  render() {
    var save;
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />

                <h3 className="message">Team Management</h3>
                <br />
                <label className="textformat">
                  Teams added for the project
                </label>
                <br />
                <br />
                <form>
                  <div className="format">
                    <table className="teamTable">
                      <tr>
                        <th className="teamTh">Teams</th>

                        <th className="teamTh">Edit Team</th>
                        <th className="teamTh">Delete Team</th>
                      </tr>
                      {this.state.teams.map((team) => (
                        <tr>
                          <th className="teamThTd">{team.teamName}</th>

                          <th className="teamThTd">
                            <button className="btn btn-info">
                              <a
                                className="teambutton"
                                href={"/teams/addmember/" + team.teamID}
                              >
                                Edit{" "}
                              </a>
                            </button>
                          </th>
                          <th className="teamThTd">
                            <form onSubmit={this.btnDelete(team.teamID)}>
                              <button className="btn btn-danger">
                                {" "}
                                Delete{" "}
                              </button>
                            </form>
                          </th>
                        </tr>
                      ))}
                    </table>
                  </div>
                </form>
                <br />
                <div className="teambutton">
                  <a
                    className="teambutton"
                    href="/teams/createteam"
                    className="btn btn-info"
                    style={{
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                  >
                    Create a new Team
                  </a>
                </div>
                <br />
                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>Team Deleted</Modal.Header>
                    <Modal.Body>
                      Team has been successfully deleted!{" "}
                    </Modal.Body>
                    <Modal.Footer>
                      {" "}
                      <button onClick={this.handleModal}>Close</button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Team;
