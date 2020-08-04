/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485 
*/
import React, { Component } from "react";
import "./ResetPassword.css";
import axios from "axios";
import CONST from "../constants";

class Otp extends Component {
  state = {
    email: "",
    emailError: "",
    otp: "",
    otpError: "",
    isOtpSent: false,
  };

  updateValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateEmail = (e) => {
    let isError = false;

    const errors = {
      emailError: "",
    };

    if (this.state.email.length === 0) {
      errors.emailError = "Email cannot be empty!";
    } else if (this.state.email.indexOf("@") === -1) {
      errors.emailError = "Requires valid email";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  validateOtp = (e) => {
    let isError = false;

    const errors = {
      otpError: "",
    };

    if (this.state.otp.length === 0) {
      isError = true;
      errors.otpError = "OTP cannot be empty!";
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
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      email: this.state.email,
      password: this.state.password,
    };

    let url = CONST.URL + "resetpassword";

    await axios
      .post(url, { data: userData }, config)
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
          "There was some issue while sending OTP to the email. Please try later!";
        this.setState({
          ...this.state,
          ...errors,
        });
      });
  };

  createOtp = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      email: this.state.email,
    };

    let url = CONST.URL + "resetpassword/otp";
    console.log("request sent to:", url);

    await axios
      .post(url, { data: userData }, config)
      .then((res) => {
        if (res["status"] === 200) {
          console.log("otp sent successful");

          const errors = {
            commonError: "",
          };
          errors.commonError = "";

          this.setState({
            isOtpSent: true,
            ...errors,
          });
        } else {
          const errors = {
            commonError: "",
            ...errors,
          };
          errors.commonError =
            "There was some issue while sending OTP to the email. Please try later!";
          this.setState({
            ...this.state,
            ...errors,
          });
        }
      })
      .catch((err) => {
        const errors = {
          commonError: "",
        };
        errors.commonError =
          "There was some issue while sending Otp. Please come back later!";
        this.setState({
          ...this.state,
          ...errors,
        });
      });
  };

  verifyOtpValue = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      email: this.state.email,
      otp: this.state.otp,
    };

    let url = CONST.URL + "resetpassword/verify";
    console.log("request sent to:", url);

    await axios
      .post(url, { data: userData }, config)
      .then((res) => {
        if (res["status"] === 200) {
          const errors = {
            commonError: "",
          };
          errors.commonError = "";

          this.setState({
            isOtpSent: true,
            ...errors,
          });

          localStorage.setItem("otp_email", userData["email"]);
          this.props.history.push("/resetpassword");
        } else {
          const errors = {
            commonError: "",
            ...errors,
          };
          errors.commonError =
            "There was some issue while validating the OTP. Please try later!";
          this.setState({
            ...this.state,
            ...errors,
          });
        }
      })
      .catch((err) => {
        const errors = {
          commonError: "",
        };
        errors.commonError =
          "There was some issue while validating the OTP. Please try later!";
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

  sendOtp = (e) => {
    e.preventDefault();

    var isErrorPresent = this.validateEmail();
    console.log(isErrorPresent);
    if (isErrorPresent == false) {
      this.createOtp();
    }
  };

  verifyOTP = (e) => {
    e.preventDefault();

    var isErrorPresent = this.validateOtp();
    console.log(isErrorPresent);
    if (isErrorPresent == false) {
      this.verifyOtpValue();
      console.log("otp validation successful!");
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

                  {this.state.isOtpSent ? (
                    <form>
                      <section>
                        <main className="form-group">
                          <label>Enter OTP</label>
                          <input
                            name="otp"
                            value={this.state.otp}
                            onChange={(e) => this.updateValues(e)}
                            type="text"
                            class="form-control"
                            placeholder="Enter OTP sent to your email"
                          ></input>
                          <p align="left" style={{ color: "red" }}>
                            {this.state.otpError}
                          </p>
                        </main>

                        <div className="container text-center">
                          <button
                            type="submit"
                            onClick={this.verifyOTP}
                            class="btn btn-primary"
                            style={{ background: "#2888d1" }}
                          >
                            Verify OTP
                          </button>
                          <br></br>
                          <br></br>
                        </div>
                      </section>
                    </form>
                  ) : (
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

                        <div className="container text-center">
                          <button
                            type="submit"
                            onClick={this.sendOtp}
                            class="btn btn-primary"
                            style={{ background: "#2888d1" }}
                          >
                            Send OTP
                          </button>
                          <br></br>
                          <br></br>
                        </div>
                      </section>
                    </form>
                  )}

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

export default Otp;
