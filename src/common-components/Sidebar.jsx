import React from "react";
import "../common-css/Sidebar.css";

export default class Sidebar extends React.Component {
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
            <li>
              {" "}
              <a href="/teams/getteamproject"> Team </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
