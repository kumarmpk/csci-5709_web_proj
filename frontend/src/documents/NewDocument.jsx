/*author :Japnoor Kaur */
import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

const initialState = {
  documentName: "",
  documentText: "",
  documentNameError: "",
  show: false,
};

class NewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.beforeChange = this.beforeChange.bind(this);
  }
  beforeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //method to create a new document
  btnClick = (event) => {
    event.preventDefault();
    const isValid = this.validate(event);
    if (isValid) {
      var config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      let userData = {
        documentName: this.state.documentName,
        documentText: this.state.documentText,
      };
      let url = CONST.URL + "docs/createdoc";

      axios.post(url, userData, config).then((res) => {
        console.log(res);
      });

      this.setState(initialState);
      this.handleModal();
    }
  };
  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
      window.location.reload();
    }
  };

  //method to validate team input
  validate = (event) => {
    event.preventDefault();
    let documentNameError = "";
    if (this.state.documentName.includes("@")) {
      documentNameError = "document name cannot include @";
    }
    if (this.state.documentName.includes("$")) {
      documentNameError = "document name cannot include $";
    }
    if (this.state.documentName.includes("#")) {
      documentNameError = "document name cannot include #";
    }
    if (this.state.documentName.includes("=")) {
      documentNameError = "document name cannot include =";
    }
    if (this.state.documentName.includes("&")) {
      documentNameError = "document name cannot include &";
    }
    if (this.state.documentName.includes("*")) {
      documentNameError = "document name cannot include *";
    }
    if (this.state.documentName.includes(")")) {
      documentNameError = "document name cannot include )";
    }
    if (this.state.documentName.includes("(")) {
      documentNameError = "document name cannot include (";
    }
    if (this.state.documentName.includes("%")) {
      documentNameError = "document name cannot include %";
    }
    if (this.state.documentName.includes("^")) {
      documentNameError = "document name cannot include ^";
    }
    if (this.state.documentName.includes("!")) {
      documentNameError = "document name cannot include !";
    }
    if (this.state.documentName.includes("+")) {
      documentNameError = "document name cannot include +";
    }
    if (this.state.documentName.includes("?")) {
      documentNameError = "document name cannot include ?";
    }
    if (documentNameError) {
      this.setState({ documentNameError });
      return false;
    }
    return true;
  };

  render() {
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />

                <h3>Document Management</h3>
                <br />
                <h6>Create Document</h6>
              </div>
              <form onSubmit={this.btnClick}>
                <br />
                <br />
                <label>Document name*</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  id="dname"
                  name="documentName"
                  style={{ width: "100%" }}
                  value={this.state.documentName}
                  onChange={this.beforeChange}
                />
                <div style={{ color: "red" }}>
                  {this.state.documentNameError}
                </div>
                <br />
                <label>Document Text*</label>
                <br />
                <textarea
                  id="dtext"
                  className="form-control"
                  name="documentText"
                  required={true}
                  style={{ width: "100%", height: "300px" }}
                  value={this.state.documentText}
                  onChange={this.beforeChange}
                />

                <br />
                <br />
                <div className="format">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-info"
                    style={{ marginBottom: "2em" }}
                  >
                    {" "}
                    Create
                  </button>
                  <div>
                    <a href="/docs/getprojectdocs"> Go to Documents </a>{" "}
                  </div>
                </div>
              </form>
              <div>
                <Modal centered show={this.state.show}>
                  <Modal.Header>
                    <h6>Document Created</h6>
                  </Modal.Header>
                  <Modal.Body>
                    Document has been successfully created!{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    {" "}
                    <button className="btn btn-info" onClick={this.handleModal}>
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default NewDocument;
