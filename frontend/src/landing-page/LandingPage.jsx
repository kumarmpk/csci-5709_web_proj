import React, { Component } from "react";
import "./LandingPage.css";
import projectImage from "../img/projects.png";
import sprintImage from "../img/Sprint.png";
import tasksImage from "../img/Tasks.PNG";
import documentsImage from "../img/Documents.PNG";
import Footer from "../../src/common-components/Footer";

class LandingPage extends Component {
  render() {
    return (
      <article>
        <header className="landingPageTitle">
          <main className="landingPageheader">
            <h1>
              Welcome to the efficient, yet the easiest project management
              application.
            </h1>
            <h2>One solution to all project management questions.</h2>
          </main>
        </header>

        <section>
          <summary className="landingPageSummaryFirst ">
            <section className="row">
              <section className="col-12 col-sm-12 col-md-6">
                <h2 className="landingPageSummaryHead">Manage project</h2>
                <p className="landingPageSummaryBody">
                  Statistics, Tasks, Members, Sprints, Budgets, Important Dates,
                  and so on about a official project, next vacation plan, can be
                  tracked here.
                </p>
              </section>

              <section className="col-12 col-sm-12 col-md-6">
                {/*
                  The first image of project iamge is created by me.
                  The second image of project image is taken from https://venngage-wordpress.s3.amazonaws.com/uploads/2015/06/header.png.
                  The third image of project image is created by me.
              */}
                <img
                  className="projectImage"
                  src={projectImage}
                  alt="Project"
                  draggable="false"
                />
              </section>
            </section>
          </summary>

          <summary className="landingPageSummary">
            <section className="row">
              <section className="col-12 col-sm-12 col-md-6">
                {/* 
                The first half of Sprint image is taken from https://startinfinity.s3.us-east-2.amazonaws.com/t/54ksa0Is7WiztNXeqL0fI0snREVVHLlcOZwLaSBH.png. 
                The second half of sprint image is taken from https://mozaicworks.com/wp-content/uploads/2017/07/Spuce-http-2F2Fgrowthrock.co2F-pdf.jpg.
            */}

                <img
                  className="sprintImage"
                  src={sprintImage}
                  alt="Sprint"
                  draggable="false"
                />
              </section>

              <section className="col-12 col-sm-12 col-md-6">
                <h2 className="landingPageSummaryHeadRight">Sprints</h2>
                <p className="landingPageSummaryBody">
                  Heart of the running project which tracks the currents tasks,
                  and backlogs of the project. This helps to get "Done"
                  releasable version.
                </p>
              </section>
            </section>
          </summary>

          <summary className="landingPageSummary2">
            <section className="row">
              <section className="col-12 col-sm-12 col-md-6">
                <h2 className="landingPageSummaryHead2">Tasks</h2>
                <p className="landingPageSummaryBody">
                  Each activity done by the entire team can be tracked under a
                  task. Tasks can be simple or complex. Generally, the tasks
                  will be an activity that consumes less than a day.
                </p>
              </section>

              <section className="col-12 col-sm-12 col-md-6">
                {/*
                  The task image is taken from https://miro.medium.com/max/1400/1*8ygFKYb0Yo6Hc-vnScGA9A.png. 
              */}
                <img
                  className="tasksImage"
                  src={tasksImage}
                  alt="Project"
                  draggable="false"
                />
              </section>
            </section>
          </summary>

          <summary className="landingPageSummary">
            <section className="row">
              <section className="col-12 col-sm-12 col-md-6">
                {/* 
                The document image is taken from http://www.querypoint.com/images/other/docauto.jpg
            */}
                <img
                  className="documentsImage"
                  src={documentsImage}
                  alt="document"
                  draggable="false"
                />
              </section>

              <section className="col-12 col-sm-12 col-md-6">
                <h2 className="landingPageSummaryHeadRight">Documents</h2>
                <p className="landingPageSummaryBody">
                  All documents related to the project can be stored here. A
                  document can be functional, technical, understandings etc.,
                </p>
              </section>
            </section>
          </summary>
        </section>
        <footer
          className={`content margin-content-top`}
          style={{ zIndex: "9000" }}
        >
          <Footer />
        </footer>
      </article>
    );
  }
}

export default LandingPage;
