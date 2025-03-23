import NavbarWSearch from "../Navbar/NavbarWSearch";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer.js";
import "./Dashboard.css";
import PropTypes from "prop-types";

function Dashboard(props) {
  let loggedIn = useRef(null);
  let newProjectForm = useRef(null);
  let closeModalButton = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userProjects, setProjectsData] = useState([]);
  const [sideBarProjects, setSideBarProjects] = useState([]);
  const [databaseQueried, setDataQueried] = useState(false);

  // Use effect for getting the current user and confirming they are logged in.
  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;

      setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
    }
    fetchData();
  }, []);

  // Function for handling the submission of a new project
  const newProjectSubmit = async (event) => {
    event.preventDefault();
    var formData = new FormData(newProjectForm.current);

    const projectName = formData.get("projectName");
    const projectDescription = formData.get("projectDescription");

    const result = await fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectName: projectName,
        projectDescription: projectDescription,
        ownerId: loggedInUser._id,
      }),
    });
    if (result) {
      closeModalButton.current.click();
      toast.dark("Successfully added a new project!");
      const dataResult = await fetch(`/projects/${loggedInUser._id}`, {
        method: "GET",
      });
      const parsedProjectsData = await dataResult.json();
      setProjectsData(parsedProjectsData);
    } else {
      toast.error("Couldn't create the new project. Please try again!");
    }
  };

  // Use effect that pulls projects for the user
  useEffect(() => {
    async function fetchProjectData() {
      if (loggedInUser && loggedInUser._id) {
        const dataResult = await fetch(`/projects/${loggedInUser._id}`, {
          method: "GET",
        });
        const parsedProjectsData = await dataResult.json();
        setProjectsData(parsedProjectsData);
        setDataQueried(true);
      }
    }
    fetchProjectData();
  }, [loggedInUser]);

  // Use effect that pulls the 5 most recently created projects for the user if they exist
  useEffect(() => {
    async function getRecentProjects() {
      if (loggedInUser && loggedInUser._id) {
        const rawData = await fetch(`/projects/${loggedInUser._id}/profile`);
        const parsedRecentProjects = await rawData.json();
        setSideBarProjects(parsedRecentProjects);
      }
    }
    getRecentProjects();
  }, [loggedInUser]);

  // This handles the logout button pressing and we call the props.logoutPressed too to let the main App component know the state has changed.
  const logoutPressed = () => {
    setLoggedIn(false);
    setLoggedInUser(null);
    props.logoutPressed();
  };

  // If the user is logged in and we have access to the user object, we will render the normal dashboard view, if not, we will redirect them.
  if (isLoggedIn && loggedInUser) {
    return (
      <div>
        <NavbarWSearch logoutPressed={logoutPressed} />
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/dashboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#newProjectModal"
                      data-bs-whatever="@mdo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      Create a new project
                    </button>
                  </li>
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                  <span>Recent Projects</span>
                </h6>
                <ul className="nav flex-column mb-2">
                  {sideBarProjects.map((project) => {
                    return (
                      <li key={project._id}>
                        <Link
                          key={project._id}
                          className="projectLink nav-link"
                          to={"/projects/" + project._id}
                        >
                          {project.projectName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {userProjects.length === 0 && (
                  <div className="container">No Projects Yet!</div>
                )}
              </div>
            </nav>
            {/* Start of new project modal setup */}
            <div
              className="modal fade"
              id="newProjectModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      New Project
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form
                      id="newProjectForm"
                      ref={newProjectForm}
                      onSubmit={newProjectSubmit}
                    >
                      <div className="mb-3">
                        <label htmlFor="projectName" className="col-form-label">
                          Project Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="projectName"
                          name="projectName"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="projectDescription"
                          className="col-form-label"
                        >
                          Project Description:
                        </label>
                        <textarea
                          className="form-control"
                          id="projectDescription"
                          name="projectDescription"
                          required
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btnClose"
                          data-bs-dismiss="modal"
                          id="closeModalButton"
                          ref={closeModalButton}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn createBtn">
                          Create Project
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2 dashTitle">Dashboard</h1>
              </div>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {userProjects.map((project) => {
                  return (
                    <Link
                      key={project._id}
                      className="projectLink"
                      to={"/projects/" + project._id}
                    >
                      <ProjectCard
                        key={project._id}
                        name={project.projectName}
                        description={project.projectDescription}
                      />
                    </Link>
                  );
                })}

                {databaseQueried && userProjects.length === 0 && (
                  <div>
                    <h3>No Projects Yet!</h3>
                  </div>
                )}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

Dashboard.propTypes = {
  logoutPressed: PropTypes.func.isRequired,
};

export default Dashboard;