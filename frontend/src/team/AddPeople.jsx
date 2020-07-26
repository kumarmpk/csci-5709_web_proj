/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import "./AddPeople.css";
import { Link, withRouter, Router } from "react-router-dom";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

class AddPeople extends Component {
  state = {
    users: [],
    show: false,
  };

  //method to delete team member
  btnDeleteMem = (id) => (e) => {
    e.preventDefault();

    var tid = this.getParam();

    console.log("id team=" + tid);
    console.log("id user=" + id);

    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let url = CONST.URL + "teams/deletemember/" + tid + "/" + id;

    const res = axios.delete(url, config).then((res) => {
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

    var r = this.getParam();

    let url = CONST.URL + "teams/addmember/" + r;

    axios.get(url, config).then((res) => {
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
                <br />
                <label className="textformat">Teams Members</label>
                <br />
                <br />

                <table className="teamTable">
                  <tr>
                    <th className="teamTh">Members</th>
                    <th className="teamTh">Delete Member</th>
                  </tr>
                  {this.state.users.map((user) => (
                    <tr>
                      <th className="teamThTd">{user.userName}</th>
                      <th className="teamThTd">
                        <form onSubmit={this.btnDeleteMem(user.userID)}>
                          <button className="btn btn-danger">Delete</button>
                        </form>
                      </th>
                    </tr>
                  ))}
                </table>
                <br />
                <button className="btn btn-info" type="button">
                  <a className="teambutton" href="/teams/addtoteam">
                    Add Member{" "}
                  </a>{" "}
                </button>
                <br />
                <br />
                <br />

                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>Member Deleted</Modal.Header>
                    <Modal.Body>
                      Member has been successfully deleted!{" "}
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

export default AddPeople;
