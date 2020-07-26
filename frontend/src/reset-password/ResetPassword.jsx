/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485 
*/
import React, { Component } from "react";
import "./ResetPassword.css";
import axios from "axios";

class ResetPassword extends Component {
  state = {
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    confirmPassword: "",
    confirmPasswordError: "",
  };

  updateValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateInputs = (e) => {
    let isError = false;
    var passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/;

    const errors = {
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    };

    if (this.state.email.length === 0) {
      errors.emailError = "Email cannot be empty!";
    } else if (this.state.email.indexOf("@") === -1) {
      errors.emailError = "Requires valid email";
    }

    if (this.state.password.length === 0) {
      isError = true;
      errors.passwordError = "Password cannot be empty!";
    } else if (!passwordFormat.test(this.state.password)) {
      isError = true;
      errors.passwordError =
        "Password should have at least one lowercase character, one uppercase character, one number and one special character";
    }

    if (this.state.confirmPassword.length === 0) {
      isError = true;
      errors.confirmPasswordError = "Confirm Password cannot be empty!";
    } else if (this.state.confirmPassword !== this.state.password) {
      isError = true;
      errors.confirmPasswordError = "Passwords do not match!";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  resetPassword = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let userData = {
      email: this.state.email,
      password: this.state.password,
    };

    await axios
      .post("http://localhost:4000/resetpassword", { data: userData }, config)
      .then((res) => {
        if (res["status"] === 200) {
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        const errors = {
          commonError: "",
        };
        errors.commonError =
          "There was some issue while resetting password. Please come back later!";
        this.setState({
          ...this.state,
          ...errors,
        });
      });
  };

  btnClick = (e) => {
    e.preventDefault();

    var isErrorPresent = this.validateInputs();
    console.log(isErrorPresent);
    if (isErrorPresent == false) {
      this.resetPassword();
    }
  };

  render() {
    return (
      <section>
        <section className="container pt-4 pb-4">
          <section className="row">
            <section className="container">
              <section className="row justify-content-center">
                <section className="col-12 col-sm-6 col-md-4 signup-section border rounded">
                  <section className="col-sm-12 text-center">
                    <h3 className="registerTitle">Reset Password</h3>
                    <p align="left" style={{ color: "red" }}>
                      {this.state.commonError}
                    </p>
                  </section>
                  <form>
                    <section>
                      <main className="form-group">
                        <label>Email address</label>
                        <input
                          name="email"
                          value={this.state.email}
                          onChange={(e) => this.updateValues(e)}
                          type="email"
                          class="form-control"
                          placeholder="Enter email address"
                        ></input>
                        <p align="left" style={{ color: "red" }}>
                          {this.state.emailError}
                        </p>
                      </main>

                      <main className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          value={this.state.password}
                          onChange={(e) => this.updateValues(e)}
                          type="password"
                          class="form-control"
                          placeholder="Enter password"
                        ></input>
                        <p align="left" style={{ color: "red" }}>
                          {this.state.passwordError}
                        </p>
                      </main>
                      <main className="form-group">
                        <label>Confirm Password</label>
                        <input
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={(e) => this.updateValues(e)}
                          type="password"
                          class="form-control"
                          placeholder="Confirm password"
                        ></input>
                        <p align="left" style={{ color: "red" }}>
                          {this.state.confirmPasswordError}
                        </p>
                      </main>
                      <div className="container text-center">
                        <button
                          type="submit"
                          onClick={this.btnClick}
                          class="btn btn-primary"
                          style={{ background: "#2888d1" }}
                        >
                          Reset Password
                        </button>
                        <br></br>
                        <br></br>
                      </div>
                    </section>
                  </form>
                  <section className="form-group text-center">
                    <p>
                      Return to log in?&nbsp;
                      <a href="/login">Login here</a>
                    </p>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default ResetPassword;
