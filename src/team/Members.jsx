/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import "./AddPeople.css";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

import {
  Link,
  withRouter,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

class Members extends Component {
  state = {
    users: [],
    userName: "",
    show: false,
  };

  //method to add team member
  btnClick = (e) => {
    e.preventDefault();
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      userName: this.state.userName,
    };

    let url = CONST.URL + "teams/addtoteam";

    const res = axios.post(url, userData, config).then((res) => {
      console.log(res);
    });
    this.handleModal();
  };

  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show == true) {
      window.location.reload();
    }
  };

  goBackClick = (e) => {
    e.preventDefault();

    const loc = window;

    loc.history.go(-2);
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "teams/addtoteam";

    axios.get(url, config).then((res) => {
      console.log(res);
      this.setState({
        users: res.data,
      });
    });
  }

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
                  <label className="textformat" for="people">
                    Choose a member to add:
                  </label>
                  <br />
                  <br />
                  <select
                    className="teamDropdown"
                    value={this.state.userName}
                    onChange={(e) =>
                      this.setState({ userName: e.target.value })
                    }
                  >
                    <option
                      className="teamDropdown"
                      class="placeholder"
                      selected
                      disabled
                      value=""
                    >
                      Select user
                    </option>
                    {this.state.users.map((user) => (
                      <option value={user.userName}>{user.userName}</option>
                    ))}
                  </select>{" "}
                  <br />
                  <br />
                  <br />
                  <br />
                  <button className="btn btn-info" type="submit">
                    Add Member
                  </button>
                </form>
                <br />

                <br />
                <br />
                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>Member Added</Modal.Header>
                    <Modal.Body>
                      Member has been successfully added!{" "}
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

export default Members;
