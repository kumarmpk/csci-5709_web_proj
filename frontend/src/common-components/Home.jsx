import React, { Component } from "react";
import "../common-css/Home.css";
import Projects from "../projects/Projects";

class Home extends Component {
  render() {
    return (
      <article className="home">
        <main className="homeForm">
          <Projects />
        </main>

      </article>
    );
  }
}

export default Home;
