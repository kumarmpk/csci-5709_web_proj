//  Author: Pratheep Kumar Manoharan
//  Banner Id:  B00837436
//  Contact Us page

import React, { Component } from "react";
import "./ContactUs.css";
import errMsg from "../errormessages";
import CONST from "../constants";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import crypto from "crypto";

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      validationErrorFlag: "",
      errors: { name: "", email: "", subject: "", message: "", all: "" },
      modalFlag: false,
      loading: false,
      errorMsg: "",
    };
  }

  componentDidMount() {}

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  //This method is used to store the field values into state object
  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({
      errorMsg: "",
    });
    let { name, value } = e.target;

    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (name) {
      case "name":
        errors.name = value.length < 5 ? errMsg["21"] : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : errMsg["14"];
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  //this method will be used for backend api calls
  async contactUsAPICall() {
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      this.setState({ loading: true });
      let backendObj = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      };

      let mykey = crypto.createCipher(
        CONST.encryption_algorithm,
        CONST.encryption_password
      );
      let encryp_backendObj = mykey.update(
        JSON.stringify(backendObj),
        "utf8",
        "hex"
      );
      encryp_backendObj += mykey.final("hex");

      let url = CONST.URL + "contact-us";

      const res = await axios.post(url, { data: encryp_backendObj }, config);

      let encryp_mess = res.data;
      let dmykey = crypto.createDecipher(
        CONST.encryption_algorithm,
        CONST.encryption_password
      );
      let mess = dmykey.update(encryp_mess, "hex", "utf8");
      mess += dmykey.final("utf8");
      mess = JSON.parse(mess);
      mess = mess.data;

      console.log("mess", mess);

      if (mess === "18" || mess === 18) {
        this.setState({
          modalFlag: true,
          email: "",
          name: "",
          subject: "",
          message: "",
          loading: false,
        });
      } else {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg[mess],
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        validationErrorFlag: true,
        errorMsg: errMsg["11"],
      });
    }
  }

  //This method is used to send the details to the suppport team and navigate the user back to landing page of the application
  handleContactUs = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
    });

    if (
      this.state &&
      this.state.name &&
      this.state.email &&
      this.state.subject &&
      this.state.message
    ) {
      if (
        this.state.name.trim() !== "" &&
        this.state.subject.trim() !== "" &&
        this.state.message.trim() !== ""
      ) {
        this.contactUsAPICall();
      } else {
        this.setState({
          errorMsg: errMsg["22"],
        });
      }
    } else {
      this.setState({
        errorMsg: errMsg["13"],
      });
    }
  };

  handleModalClose = (e) => {
    this.props.history.push("/");
  };

  handleLoadingClose = (e) => {
    this.setState({ loading: false });
  };

  render() {
    const { errors } = this.state;
    const { errorMsg } = this.state;

    return (
      <article>
        <section>
          <Modal
            show={this.state.loading}
            onHide={this.handleLoadingClose}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Loading</Modal.Title>
            </Modal.Header>
            <Modal.Body>The details are being sent please wait....</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleLoadingClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </section>

        <section className="row justify-content-center py-3">
          <main className="contactUsForm col-12 col-sm-10 col-md-7 col-lg-7 col-xl-5 border rounded py-2 contactus-div">
            <section className="contactUsCard">
              <section className="contactUsCard-body">
                <header className="contactUsTitle">
                  <h2>Contact Us</h2>
                </header>

                <form>
                  {errorMsg.length > 0 && (
                    <span className="error">{errorMsg}</span>
                  )}
                  <section className="form-group">
                    <label>Name*</label>
                    <input
                      required
                      type="name"
                      name="name"
                      onChange={this.handleOnChange}
                      value={this.state.name}
                      className="form-control"
                      placeholder="Enter name"
                      maxLength="30"
                    />
                    {errors.name.length > 0 && (
                      <span className="error">{errors.name}</span>
                    )}
                  </section>
                  <section className="form-group">
                    <label>Email Address*</label>
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={this.handleOnChange}
                      value={this.state.email}
                      className="form-control"
                      placeholder="Enter email address"
                      maxLength="40"
                    />
                    {errors.email.length > 0 && (
                      <span className="error">{errors.email}</span>
                    )}
                  </section>
                  <section className="form-group">
                    <label>Subject*</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      onChange={this.handleOnChange}
                      value={this.state.subject}
                      className="form-control"
                      placeholder="Enter subject"
                      maxLength="150"
                    />
                  </section>
                  <section className="form-group">
                    <label>Message*</label>
                    <textarea
                      required
                      type="text"
                      name="message"
                      onChange={this.handleOnChange}
                      value={this.state.message}
                      className="form-control"
                      placeholder="Enter detailed description"
                      maxLength="400"
                    />
                  </section>
                  <section className="container text-center">
                    <button
                      onClick={this.handleContactUs}
                      type="submit"
                      className="btn btn-info btn-centre align"
                    >
                      Submit
                    </button>
                  </section>
                </form>
              </section>
            </section>
          </main>

          <Modal
            show={this.state.modalFlag}
            onHide={this.handleModalClose}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Contact Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The details are successfully submitted to our team. We will get
              back to you as soon as possible.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </article>
    );
  }
}

export default ContactUs;
