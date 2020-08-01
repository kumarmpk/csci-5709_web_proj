import React from "react";

import "../common-css/styles.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="custom-footer">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center text-center">

            <div className="col-12 col-sm-6 order-sm-last col-md-4 order-md-first col-lg-4 p-3">
              <h5>Links</h5>
              {/* <ul className="list-unstyled"> */}
              <a className="custom-link" href="/">
                Home
              </a>
              &nbsp;|&nbsp;
              <a className="custom-link" href="/contact-us">
                Contact&nbsp;Us
              </a>
              &nbsp;|&nbsp;
              <a className="custom-link" href="/about-us">
                About&nbsp;Us
              </a>
              {/* </ul> */}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <p>© Copyright 2020 Protracker Inc.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
