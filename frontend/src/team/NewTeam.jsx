/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import "./AddPeople.css";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

const initialState = {
  teamName: "",
  teamNameError: "",
  show: false,
};

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.beforeChange = this.beforeChange.bind(this);
  }
  beforeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //method to create a new team
  btnClick = (event) => {
    event.preventDefault();
    const isValid = this.validate(event);
    if (isValid) {
      var config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      let userData = {
        teamName: this.state.teamName,
      };

      let url = CONST.URL + "teams/createteam";

      const res = axios.post(url, userData, config).then((res) => {
        console.log(res);
      });

      this.setState(initialState);
      this.handleModal();
    }
  };
  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show == true) {
      window.location.reload();
    }
  };

  //method to validate team input
  validate = (event) => {
    event.preventDefault();
    let teamNameError = "";
    if (this.state.teamName.includes("@")) {
      teamNameError = "team name cannot include @";
    }
    if (this.state.teamName.includes("$")) {
      teamNameError = "team name cannot include $";
    }
    if (this.state.teamName.includes("#")) {
      teamNameError = "team name cannot include #";
    }
    if (this.state.teamName.includes("=")) {
      teamNameError = "team name cannot include =";
    }
    if (this.state.teamName.includes("&")) {
      teamNameError = "team name cannot include &";
    }
    if (this.state.teamName.includes("*")) {
      teamNameError = "team name cannot include *";
    }
    if (this.state.teamName.includes(")")) {
      teamNameError = "team name cannot include )";
    }
    if (this.state.teamName.includes("(")) {
      teamNameError = "team name cannot include (";
    }
    if (this.state.teamName.includes("%")) {
      teamNameError = "team name cannot include %";
    }
    if (this.state.teamName.includes("^")) {
      teamNameError = "team name cannot include ^";
    }
    if (this.state.teamName.includes("!")) {
      teamNameError = "team name cannot include !";
    }
    if (this.state.teamName.includes("+")) {
      teamNameError = "team name cannot include +";
    }
    if (this.state.teamName.includes("?")) {
      teamNameError = "team name cannot include ?";
    }
    if (teamNameError) {
      this.setState({ teamNameError });
      return false;
    }
    return true;
  };

  render() {
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />

                <h3 className="message">Team Management</h3>
                <form onSubmit={this.btnClick}>
                  <br />
                  <br />
                  <label for="tname" className="textformat">
                    Team name:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="tname"
                    name="teamName"
                    value={this.state.teamName}
                    onChange={this.beforeChange}
                  />
                  <div style={{ color: "red" }}>{this.state.teamNameError}</div>
                  <br />
                  <br />

                  <br />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info"
                    style={{ marginBottom: "2em" }}
                  />
                </form>
                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>Team Created</Modal.Header>
                    <Modal.Body>
                      Team has been successfully created!{" "}
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

export default NewTeam;
