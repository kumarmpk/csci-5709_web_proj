/*author :Japnoor Kaur */
import React, { Component } from "react";
import axios from "axios";
import "./Team.css";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

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
    //var arr = [];
    var f;
    var finalf;
    //  const urlParams = new URLSearchParams(pathandQuery);
    f = pathandQuery.lastIndexOf;
    var arr = pathandQuery.split("/");
    for (var i = 0; i < f.length; i++) {
      arr[i] = pathandQuery.split("/");
    }
    finalf = arr[arr.length - 1];

    //const project1 = urlParams.get("projectId");
    return finalf;
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const r = this.getParam();

    let url = CONST.URL + "teams/manageteams/" + r;

    axios.get(url, config).then((res) => {
      ////console.log(res);
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
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "teams/deleteteam/" + id;

    axios.delete(url, config).then((res) => {
      //  //console.log(res);
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
    // var save;
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />

                <h3 className="message">Team Management</h3>
                <br />
                <h6>Teams added for the project</h6>
                <br />
                <br />
                <form>
                  <div className="format">
                    <table className="table table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th className="teamTh">Teams</th>

                          <th className="teamTh">Edit Team</th>
                          <th className="teamTh">Delete Team</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.teams.map((team) => (
                          <tr key={team.teamName}>
                            <th className="teamThTd">{team.teamName}</th>

                            <th className="teamThTd">
                              <button
                                className="btn btn-danger"
                                style={{ background: "#2888d1" }}
                              >
                                <a
                                  className="teambutton"
                                  href={"/teams/addmember/" + team.teamID}
                                >
                                  Edit{" "}
                                </a>
                              </button>
                            </th>
                            <th className="teamThTd">
                              <button
                                className="btn btn-danger"
                                onClick={this.btnDelete(team.teamID)}
                              >
                                {" "}
                                Delete{" "}
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
                <br />
                <div className="teambutton">
                  <a
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
                  <a href="/teams/getteamproject"> Go to Teams </a>{" "}
                </div>
                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>Team Deleted</Modal.Header>
                    <Modal.Body>
                      Team has been successfully deleted!{" "}
                    </Modal.Body>
                    <Modal.Footer>
                      {" "}
                      <button
                        className="btn btn-danger"
                        style={{ background: "#2888d1" }}
                        onClick={this.handleModal}
                      >
                        Close
                      </button>
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
