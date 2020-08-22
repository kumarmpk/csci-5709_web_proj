/*author :Japnoor Kaur */
import React, { Component } from "react";
import axios from "axios";
import "./AddPeople.css";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

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

    axios.post(url, userData, config).then((res) => {
      // //console.log(res);
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
      //  //console.log(res);
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
                <h3>Team Management</h3>
                <form onSubmit={this.btnClick}>
                  <br />
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th className="teamTh">
                          Members (Choose a member to add)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="format" style={{ paddingLeft: "25%" }}>
                        <td style={{ paddingLeft: "25%" }}>
                          <select
                            className="form-control"
                            value={this.state.userName}
                            style={{ width: "70%" }}
                            onChange={(e) =>
                              this.setState({ userName: e.target.value })
                            }
                          >
                            <option className="teamDropdown" disabled value="">
                              Select user
                            </option>
                            {this.state.users.map((user) => (
                              <option value={user.userName} key={user.userName}>
                                {user.userName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <button
                    className="btn btn-danger"
                    style={{ background: "#2888d1" }}
                    type="submit"
                  >
                    Add Member
                  </button>
                </form>
                <br />
                <div>
                  <a href="/teams/getteamproject"> Go to Teams </a>{" "}
                </div>

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

export default Members;
