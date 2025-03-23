import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">Task Flow</span>
        </div>
        <div className="footer-center">
          <p className="text">Built by Yashodip Jagtap</p>
        </div>
        <div className="footer-right">
          <a
            href="https://www.linkedin.com/in/yashodipjagtap/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yashodipjagtap"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
