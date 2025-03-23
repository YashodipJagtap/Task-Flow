// frontend/src/SearchResults/SearchResultsPage
import Navbar from "../Navbar/Navbar";
import ProjectCard from "../Dashboard/ProjectCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer.js";
import PropTypes from "prop-types";

function SearchResultsPage(props) {
  const { query } = useParams();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logged-in user data
  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      setLoggedInUser(parsedResult.user);
    }
    fetchData();
  }, []);

  // Fetch search results and count
  useEffect(() => {
    async function fetchSearchResults() {
      if (loggedInUser && loggedInUser._id && query) {
        setIsLoading(true);

        // Fetch search results
        const resultsResponse = await fetch(
          `/search/${loggedInUser._id}/${query}/page/${currentPage}`,
          { method: "GET" }
        );
        const resultsData = await resultsResponse.json();
        setUserProjects(resultsData);

        // Fetch total count of search results
        const countResponse = await fetch(
          `/search/${loggedInUser._id}/count/${query}`,
          { method: "GET" }
        );
        const countData = await countResponse.json();
        setTotalResults(countData.count);

        setIsLoading(false);
      }
    }
    fetchSearchResults();
  }, [loggedInUser, query, currentPage]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle logout
  const logoutPressed = () => {
    props.logoutPressed();
  };

  // If the user is logged in, render the search results page
  if (loggedInUser) {
    return (
      <div>
        <Navbar logoutPressed={logoutPressed} />
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
                      className="nav-link"
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
                </ul>
              </div>
            </nav>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Search Results: {query}</h1>
              </div>
              {isLoading ? (
                <div className="text-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {userProjects.length > 0 ? (
                      userProjects.map((project) => (
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
                      ))
                    ) : (
                      <h3>No results found for "{query}".</h3>
                    )}
                  </div>
                  {/* Pagination */}
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={userProjects.length < 10} // Assuming 10 results per page
                    >
                      Next
                    </button>
                  </div>
                  <p className="text-center mt-2">
                    Page {currentPage} | Total Results: {totalResults}
                  </p>
                </>
              )}
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

SearchResultsPage.propTypes = {
  logoutPressed: PropTypes.func.isRequired,
};

export default SearchResultsPage;