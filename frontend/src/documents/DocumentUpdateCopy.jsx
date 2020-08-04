/*author :Japnoor Kaur */

import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import CONST from "../constants";

const initialState = {
  docs: [],
  documentName: "",
  documentText: "",
  docName: "",
  docText: "",
  documentNameError: "",
  show: false,
  modalMsg: "Document has been successfully updated.",
};
//var persons = new Map();
class DocumentUpdate extends Component {
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

  //method to update a document
  handleUpdate = (event) => {
    event.preventDefault();

    const isValid = this.validate(event);
    if (isValid) {
      var config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let userData = {
        documentName: this.state.documentName,
        documentText: this.state.docText,
      };
      const docID = this.getParam();

      axios
        .put("http://localhost:4000/docs/updatedocs/" + docID, userData, config)
        .then((res) => {
        });

      this.setState(initialState);
      this.handleModal();
    }
  };
  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
      this.props.history.push("/docs/getprojectdocs");
    }
  };

  handleDelete = (e) => {
    e.preventDefault();


    const docID = this.getParam();

    axios
      .delete("http://localhost:4000/docs/deletedoc/" + docID)
      .then((res) => {
        this.setState({
          modalMsg: "Document has been successfully deleted.",
          show: true,
        });
      });

    this.handleModal();
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
  //get the path variable from the URL
  getParam = () => {
    let pathandQuery = (
      window.location.pathname + window.location.search
    ).substr(1);
    // var arr = [];
    var f;
    var finalf;
    //const urlParams = new URLSearchParams(pathandQuery);
    f = pathandQuery.lastIndexOf;
    var arr = pathandQuery.split("/");
    for (var i = 0; i < f.length; i++) {
      arr[i] = pathandQuery.split("/");
    }
    finalf = arr[arr.length - 1];

    // const project1 = urlParams.get("projectId");
    return finalf;
  };
  //it will be executed after the whole page is loaded
  componentDidMount() {
    const r = this.getParam();

    axios.get("http://localhost:4000/docs/updatedocs/" + r).then((res) => {
      this.setState({
        docs: res.data,
        docText: res.data.documentText,
      });
    });

  }
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
                <h6>Update Document</h6>
              </div>
              <br />
              <form>
                <label for="dname">Document name (read only)</label>
                <br />
                {this.state.docs.map((doc) => (
                  <text
                    required="true"
                    className="form-control"
                    id="dname"
                    name="documentName"
                    style={{ width: "100%" }}
                    value={doc.documentName}
                    onChange={this.beforeChange}
                  >
                    {doc.documentName}
                  </text>
                ))}
                <div style={{ color: "red" }}>
                  {this.state.documentNameError}
                </div>
                <br />
                <label for="dname">Document Text*</label>
                <br />
                {this.state.docs.map((doc) => (
                  <textarea
                    id="dtext"
                    name="docText"
                    className="form-control"
                    required="true"
                    value={doc.docText}
                    style={{ width: "100%", height: "300px" }}
                    onChange={this.beforeChange}
                  >
                    {doc.documentText}
                  </textarea>
                ))}
                <br />
                <br />

                <br />
                <div className="format">
                  <button
                    onClick={this.handleUpdate}
                    className="btn btn-info"
                    style={{ marginBottom: "2em" }}
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    onClick={this.handleDelete}
                    className="btn btn-info ml-2"
                    style={{ marginBottom: "2em" }}
                  >
                    {" "}
                    Delete
                  </button>
                  <button
                    className="btn btn-info ml-2"
                    style={{ marginBottom: "2em" }}
                  >
                    {" "}
                    <a style={{ color: "white" }} href="/docs/getprojectdocs">
                      {" "}
                      Close{" "}
                    </a>{" "}
                  </button>
                  <div></div>
                </div>
              </form>

              <div>
                <Modal centered show={this.state.show}>
                  <Modal.Header>
                    <h6>Document</h6>
                  </Modal.Header>
                  <Modal.Body>
                    {this.state.modalMsg ? this.state.modalMsg : null}
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

export default DocumentUpdate;
