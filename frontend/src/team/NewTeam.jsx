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

      axios.post(url, userData, config).then((res) => {
        //console.log(res);
      });

      this.setState(initialState);
      this.handleModal();
    }
  };
  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
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
              <br />
              <div className="format">
                <br />

                <h3>Team Management</h3>
                <br />
                <h6>Create Team</h6>
              </div>
              <form onSubmit={this.btnClick}>
                <br />
                <br />
                <label style={{ paddingLeft: "25%" }}>Team name*:</label>

                <br />
                <div className="format">
                  <div style={{ paddingLeft: "25%" }}>
                    <input
                      type="text"
                      className="form-control"
                      id="tname"
                      required={true}
                      name="teamName"
                      style={{ width: "70%" }}
                      value={this.state.teamName}
                      onChange={this.beforeChange}
                    />
                    <div style={{ color: "red" }}>
                      {this.state.teamNameError}
                    </div>
                    <br />
                    <br />
                  </div>

                  <br />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info"
                    style={{ marginBottom: "2em" }}
                  />
                </div>
              </form>
              <div className="format">
                <a href="/teams/getteamproject"> Go to Teams </a>{" "}
              </div>
              <br />
              <div>
                <Modal centered show={this.state.show}>
                  <Modal.Header>Team Created</Modal.Header>
                  <Modal.Body>Team has been successfully created! </Modal.Body>
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
        </main>
      </article>
    );
  }
}

export default NewTeam;
