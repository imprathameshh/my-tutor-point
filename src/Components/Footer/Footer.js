import React from "react";
import "./footer.css";

//IMPORT IMAGE
import Instagram from "../../Assets/Images/instagram.svg";
import Twitter from "../../Assets/Images/twitter.svg";
import Youtube from "../../Assets/Images/you-tube.svg";
import V from "../../Assets/Images/v.svg";

const Footer = () => {
  return (
    <div className="footer-wrap">
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="footer-list">
                <h3>Company </h3>
                <ul>
                  <li>
                    <a href="#">About My Tutor Point</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Press</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="footer-list">
                <h3>Student </h3>
                <ul>
                  <li>
                    <a href="#">Parent Account</a>
                  </li>
                  <li>
                    <a href="#">Teacher's Directory</a>
                  </li>
                  <li>
                    <a href="#">Subject Directory</a>
                  </li>
                </ul>
              </div>
              <div className="footer-list">
                <h3>Tutor </h3>
                <ul>
                  <li>
                    <a href="#">Become a Teacher</a>
                  </li>
                  <li>
                    <a href="#">Teacher's Handbook</a>
                  </li>
                  <li>
                    <a href="#">Directory</a>
                  </li>
                </ul>
              </div>
              <div className="footer-list">
                <h3>Institutes </h3>
                <ul>
                  <li>
                    <a href="#">lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                </ul>
              </div>
              <div className="footer-list">
                <h3>Communities </h3>
                <ul>
                  <li>
                    <a href="#">lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                  <li>
                    <a href="#">Lorem Ipsum</a>
                  </li>
                </ul>
              </div>
              <div className="footer-list">
                <h3>Subscribe </h3>
                <div className="subscribe-group">
                  <div className="form-group">
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className="submit-container">
                    <button type="submit" form="" value="Submit">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="copyright footer-bottom-child">
                © 2020 My Tutor Point Limited
              </div>
              <div className="terms footer-bottom-child">
                Terms & Conditions Privacy Legal Sitemap
              </div>
              <div className="social-icon footer-bottom-child">
                <ul>
                  <li>
                    <a>
                      <img src={Instagram} />
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={Twitter} />
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={Youtube} />
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={V} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
