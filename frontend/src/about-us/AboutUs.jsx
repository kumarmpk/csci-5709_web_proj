import React, { Component } from "react";
import "./AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <article>
        <section className="row justify-content-center">
          <section className="col-12 col-sm-8 col-md-11 col-lg-10 border rounded">
            <header className="aboutUsTitle row">
              <h2>About Us</h2>
            </header>

            <section>
              <summary className="aboutUsSummary">
                <aside className="aboutUsaside">
                  <h3 className="aboutUsSummaryHead">Our Solution</h3>
                  <p>
                    The major solutions that we provide are the project
                    management features like tracking all the tasks of the
                    project, tracking the activities of members of team, and
                    preparing the statistics.
                  </p>
                </aside>
                <h3 className="aboutUsSummaryHead">Our Mission</h3>
                <p className="aboutUsSummaryBody">
                  Our mission is to build an user friendly web application. The
                  app is designed in such a way that is very easy to use,
                  access, and the non technical members of team can also use.
                </p>
              </summary>

              <summary className="aboutUsSummary">
                <aside className="aboutUsaside">
                  <h3 className="aboutUsSummaryHead">Our Pricing</h3>
                  <p>
                    Our web app is absolutely free. We are planning to provide
                    free facilities and improve further on user requirements.
                    The specific user requirement will cost for the user and the
                    price is solely depends on the requirement.
                  </p>
                </aside>
                <h3 className="aboutUsSummaryHead">Our Goal</h3>
                <p className="aboutUsSummaryBody">
                  Our mission is to build an user friendly web application. The
                  app is designed in such a way that is very easy to use,
                  access, and the non technical members of team can also use.
                </p>
              </summary>

              <summary className="aboutUsSummary">
                <h3 className="aboutUsSummaryHead">Team</h3>
                <aside className="aboutUsaside">
                  <h5 className="aboutUsSummaryHead">Kaur, Japnoor</h5>
                  <p>
                    Our mission is to build an user friendly web application.
                    The app is designed in such a way that is very easy to use,
                    access, and the non technical members of team can also use.
                  </p>
                </aside>
                <h5 className="aboutUsSummaryHead">Dasari, Kethan Srinivas</h5>
                <p className="aboutUsSummaryBody">
                  Our mission is to build an user friendly web application. The
                  app is designed in such a way that is very easy to use,
                  access, and the non technical members of team can also use.
                </p>
              </summary>

              <summary className="aboutUsSummary">
                <aside className="aboutUsaside">
                  <h5 className="aboutUsSummaryHead">Patel, Falgun</h5>
                  <p>
                    Our mission is to build an user friendly web application.
                    The app is designed in such a way that is very easy to use,
                    access, and the non technical members of team can also use.
                  </p>
                </aside>
                <h5 className="aboutUsSummaryHead">
                  Manoharan, Pratheep Kumar
                </h5>
                <p className="aboutUsSummaryBody">
                  Our mission is to build an user friendly web application. The
                  app is designed in such a way that is very easy to use,
                  access, and the non technical members of team can also use.
                </p>
              </summary>

              <summary className="aboutUsSummaryLast">
                <h5 className="aboutUsSummaryHead">Patel, Meet</h5>
                <p className="aboutUsSummaryBody">
                  Our mission is to build an user friendly web application. The
                  app is designed in such a way that is very easy to use,
                  access, and the non technical members of team can also use.
                </p>
              </summary>
            </section>
          </section>
        </section>
      </article>
    );
  }
}

export default AboutUs;
