import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./Project/Project";
import SearchResultsPage from "./SearchResults/SearchResultsPage";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import Profile from "./Profile/Profile";
import UpdateProfile from "./Profile/UpdateProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Landing from "./LandingPage/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is logged in on initial render
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("/auth/isLoggedIn", { method: "GET" });
        const parsedResult = await result.json();
        setLoggedIn(parsedResult.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle logout
  const logoutPressed = () => {
    setLoggedIn(false);
  };

  // Handle login
  const loginPressed = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div aria-live="polite" aria-label="toast message">
        <ToastContainer role="alert" ariaLabel="toast" />
      </div>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          {loggedIn ? (
            <Dashboard logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/profile">
          {loggedIn ? (
            <Profile logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/profile/update">
          {loggedIn ? (
            <UpdateProfile logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/projects/:projectId">
          {loggedIn ? (
            <Project logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/search/:query">
          {loggedIn ? (
            <SearchResultsPage logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login">
          {!loggedIn ? (
            <Login loginPressed={loginPressed} loggedIn={loggedIn} />
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Landing />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;