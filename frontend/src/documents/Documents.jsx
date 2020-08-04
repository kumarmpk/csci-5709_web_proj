/*author :Japnoor Kaur */
import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

class Documents extends Component {
  state = {
    docs: [],
    show: false,
  };

  //get the path variable from the URL
  getParam = () => {
    let pathandQuery = (
      window.location.pathname + window.location.search
    ).substr(1);
    //var arr = [];
    var f;
    var finalf;
    //const urlParams = new URLSearchParams(pathandQuery);
    f = pathandQuery.lastIndexOf;
    var arr = pathandQuery.split("/");
    for (var i = 0; i < f.length; i++) {
      arr[i] = pathandQuery.split("/");
    }
    finalf = arr[arr.length - 1];

    //const project1 = urlParams.get("projectId");
    return finalf;
  };

  //it will be executed after the whole page is loaded
  componentDidMount() {
    const r = this.getParam();
    axios.get("http://localhost:4000/docs/managedocs/" + r).then((res) => {
      //console.log(res);
      this.setState({
        docs: res.data,
      });
    });
  }

  //method to delete team
  btnDelete = (id) => (e) => {
    e.preventDefault();
    /* var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };*/

    axios.delete("http://localhost:4000/docs/deletedoc/" + id).then((res) => {
      // console.log(res);
    });

    this.handleModal();
  };

  //method to handle modal to get user know that specific task is done
  handleModal = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
      window.location.reload();
    }
  };
  render() {
    //var save;
    return (
      <article className="users">
        <main className="usersForm">
          <div className="teamRow">
            <div className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
              <div className="format">
                <br />

                <h3>Document Management</h3>

                <br />
                <h6>Documents added for the project</h6>
                <br />
                <br />
                <form>
                  <div className="format">
                    <table className="table table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th className="teamTh">Documents</th>

                          <th className="teamTh">Edit Document</th>
                          <th className="teamTh">Delete Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.docs.map((document) => (
                          <tr key={document.documentName}>
                            <th className="teamThTd">
                              {document.documentName}
                            </th>

                            <th className="teamThTd">
                              <button className="btn btn-info">
                                <a
                                  className="teambutton"
                                  href={
                                    "/docs/updatedocs/" + document.documentID
                                  }
                                >
                                  Edit{" "}
                                </a>
                              </button>
                            </th>
                            <th className="teamThTd">
                              <button
                                className="btn btn-danger"
                                onClick={this.btnDelete(document.documentID)}
                              >
                                {" "}
                                Delete{" "}
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
                <br />
                <div className="teambutton">
                  <a
                    href="/docs/createdoc"
                    className="btn btn-info"
                    style={{
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                  >
                    Create a new Document
                  </a>
                </div>

                <div>
                  <a href="/docs/getprojectdocs"> Back to Documents </a>{" "}
                </div>
                <br />
                <div>
                  <Modal centered show={this.state.show}>
                    <Modal.Header>
                      <h6>Document Deleted</h6>
                    </Modal.Header>
                    <Modal.Body>
                      Document has been successfully deleted!{" "}
                    </Modal.Body>
                    <Modal.Footer>
                      {" "}
                      <button
                        className="btn btn-info"
                        onClick={this.handleModal}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Documents;
