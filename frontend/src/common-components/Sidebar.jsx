import React from "react";
import "../common-css/Sidebar.css";

const initialState = {
  show: false,
};

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  handleUser = () => {
    this.setState({ show: !this.state.show });
  };
  componentDidMount() {
    let uRole = localStorage.role;

    if (uRole === "admin" || uRole === "manager") {
      this.handleUser();
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="sidebar">
          <h2> Sidebar </h2>
          <ul>
            <li>
              {" "}
              <a href="/dashboard"> Dashboard </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/profile"> Profile </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/home"> Projects </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/tasks"> Tasks </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/announcements"> Announcements </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/create"> Create </a>{" "}
            </li>
            <li>
              {" "}
              <a href="/search"> Search </a>{" "}
            </li>

            {this.state.show && (
              <li show="this.state.show">
                {" "}
                <a href="/teams/getteamproject"> Team </a>{" "}
              </li>
            )}
            <li>
              {" "}
              <a href="/docs/getprojectdocs"> Documents </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
