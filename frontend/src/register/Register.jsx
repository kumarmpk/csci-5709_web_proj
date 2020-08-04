/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485 
*/
import React, { Component } from "react";
import "./Register.css";
import axios from "axios";
import CONST from "../constants";

class Register extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("authenticated") !== null) {
      this.props.history.push("/create");
    }
  }

  state = {
    name: "",
    nameError: "",
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
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    };

    if (this.state.email.length === 0) {
      isError = true;
      errors.emailError = "Email cannot be empty!";
    } else if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    if (this.state.name.length === 0) {
      isError = true;
      errors.nameError = "Full name cannot be empty!";
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

  //This method sends API call to backend and registers the user
  registerUser = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    console.log(userData);

    let url = CONST.URL + "register";

    const res = await axios.post(url, { data: userData }, config);

    this.props.history.push("/login");
    console.log(res);
  };

  btnClick = (e) => {
    e.preventDefault();

    const err = this.validateInputs();
    if (!err) {
      this.setState({
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        confirmPassword: "",
        confirmPasswordError: "",
      });

      this.registerUser();
    }
  };

  render() {
    return (
      <section>
        <section className="container pt-4 pb-4">
          <section className="row ">
            <section className="container">
              <section className="row justify-content-center">
                <section className="col-12 col-sm-6 col-md-4 signup-section border rounded">
                  <section className="col-sm-12 text-center">
                    <h3 className="registerTitle">Sign up</h3>
                  </section>
                  <form className="form-container">
                    <section className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        id="username"
                        value={this.state.name}
                        onChange={(e) => this.updateValues(e)}
                        className="form-control"
                        placeholder="Enter full name"
                      />
                      <p align="left" style={{ color: "red" }}>
                        {this.state.nameError}
                      </p>
                    </section>

                    <section className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={(e) => this.updateValues(e)}
                        className="form-control"
                        placeholder="Enter email address"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      ></input>
                      <p align="left" style={{ color: "red" }}>
                        {this.state.emailError}
                      </p>
                    </section>

                    <section className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={(e) => this.updateValues(e)}
                        className="form-control"
                        placeholder="Enter password"
                      ></input>
                      <p align="left" style={{ color: "red" }}>
                        {this.state.passwordError}
                      </p>
                    </section>

                    <section className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmpassword"
                        value={this.state.confirmPassword}
                        onChange={(e) => this.updateValues(e)}
                        className="form-control"
                        placeholder="Confirm password"
                      ></input>
                      <p align="left" style={{ color: "red" }}>
                        {this.state.confirmPasswordError}
                      </p>
                    </section>
                    <section className="container text-center">
                      <button
                        onClick={this.btnClick}
                        type="submit"
                        className="btn btn-info btn-centre"
                        style={{ background: "#2888d1" }}
                      >
                        Sign up
                      </button>
                    </section>
                  </form>
                  <br />
                  <section className="form-group text-center">
                    <p>
                      Already have an account? &nbsp;
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

export default Register;
