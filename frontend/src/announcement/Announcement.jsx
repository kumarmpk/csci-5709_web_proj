import React from "react";

export default class Announcement extends React.Component {
  render() {
    return (
      <div>
        <div className="col-sm-12 text-center pt-3">
          <h2 className="wlc-msg"> Announcements </h2>
        </div>
        <div className="container pb-3">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10">
              <div className="d-flex w-60 justify-content-between sort-filter-div">
                <div className="dropdown filter">
                  <button
                    className="btn btn-primary"
                    style={{ background: "#2888d1" }}
                    type="button"
                    id="dropdownMenuButtonFilter"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Filter
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButtonFilter"
                  >
                    <a className="dropdown-item" href="/announcements">
                      None
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Task Announcements
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Project Announcements
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Issue Announcements
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Unread Announcements
                    </a>
                  </div>
                </div>
                <div className="dropdown sort">
                  <button
                    className="btn btn-primary"
                    style={{ background: "#2888d1" }}
                    type="button"
                    id="dropdownMenuButtonSort"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort By
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButtonSort"
                  >
                    <a className="dropdown-item" href="/announcements">
                      None
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Deadline
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Date Created
                    </a>
                    <a className="dropdown-item" href="/announcements">
                      Priority
                    </a>
                  </div>
                </div>
              </div>
              <div className="list-group list-style">
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {" "}
                      New Project added - Project Euler{" "}
                    </h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      {" "}
                      Project added by Meet Patel.
                    </small>
                    <small className="text-muted">June 10, 8:36 PM.</small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {" "}
                      Issue has been marked 'resolved' - Issue Hotfix{" "}
                    </h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      {" "}
                      Issue resolved by John Doe.
                    </small>
                    <small className="text-muted">June 8, 5:3 PM.</small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {" "}
                      Task deadline extended - Task Front End Validation{" "}
                    </h5>
                    <h5>
                      {" "}
                      <span className="badge badge-secondary">
                        {" "}
                        Opened{" "}
                      </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      {" "}
                      Task modified by Jai Dhiman.
                    </small>
                    <small className="text-muted">May 10, 8:36 PM.</small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-secondary">
                        {" "}
                        Opened{" "}
                      </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
                <a
                  href="/announcements"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <h5>
                      {" "}
                      <span className="badge badge-primary"> New </span>{" "}
                    </h5>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas
                    sed diam eget risus varius blandit. Donec id elit non mi
                    porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
