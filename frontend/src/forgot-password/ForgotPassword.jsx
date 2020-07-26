import React, { Component } from "react";
import "./ForgotPassword.css";
import errMsg from "../errormessages";
import { Modal, Button } from "react-bootstrap";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      validationErrorFlag: "",
      errorMsg: "",
      modalFlag: false,
    };
  }

  //this method is used to store the field values into state object
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //this method will be used for the backend api calls
  async apiCall() {
    try {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        organization: "",
        role: "",
        registrationFlag: true,
        modalFlag: true,
      });
    } catch (err) {
      this.setState({
        errorMsg: err,
        validationErrorFlag: true,
      });
    }
  }

  handleModalClose = (e) => {
    this.props.history.push("/login");
  };

  //this method is called on reset password button click
  //to validate and allow the user to reset the password
  handleResetPassword = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
    });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(this.state.email).toLowerCase());

    if (
      this.state &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state !== {} &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.confirmPassword !== ""
    ) {
      //email address validation
      if (!validEmail) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["14"],
        });
        return;
      }

      //password and confirm password comparison
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["15"],
        });
        return;
      }

      this.apiCall();
    } else {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["13"],
      });
    }
  };

  render() {
    return (
      <section>
        <section className="forgotPasswordForm">
          <section className="forgotPasswordCard">
            <article className="forgotPasswordCard-body">
              <form>
                {this.state.validationErrorFlag && (
                  <p className="errorMsg">{this.state.errorMsg}</p>
                )}

                <h3 className="title" style={{ aligntext: 'center' }}>Forgot Password</h3>

                <section>
                  <summary className="forgot-password-summary">
                    <label>Email Address*</label>
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={this.handleOnChange}
                      className="form-control text-field"
                      placeholder="Enter email address"
                      tabIndex="1"
                      style={{ width: '50%' }}
                    />
                  </summary>

                  <summary className="forgot-password-summary">
                    <label>Password*</label>
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      onChange={this.handleOnChange}
                      className="form-control text-field"
                      placeholder="Enter password"
                      tabIndex="3"
                      style={{ width: '50%' }}
                    />
                  </summary>
                  <summary className="forgot-password-summary">
                    <label>Confirm Password*</label>
                    <input
                      required
                      type="password"
                      name="password"
                      onChange={this.handleOnChange}
                      className="form-control text-field custom-form-control"
                      placeholder="Enter password"
                      tabIndex="2"
                      style={{ width: '50%' }}
                    />
                  </summary>
                  <summary className="forgot-password-summary">
                    <button
                      onClick={this.handleResetPassword}
                      type="submit"
                      className="btn btn-info btn-centre"
                      tabIndex="7"
                    >
                      Reset Password
                    </button>
                  </summary>
                </section>
              </form>
            </article>
          </section>
        </section>

        <Modal show={this.state.modalFlag} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Password Reset is success. Please login to access the application.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

      </section >
    );
  }
}

export default ForgotPassword;
