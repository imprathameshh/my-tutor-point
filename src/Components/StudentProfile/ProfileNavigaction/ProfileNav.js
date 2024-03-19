import React from "react";
import { Link } from "react-router-dom";
import "./profileNav.css";

//IMAGES
import Dashboard from "../../../Assets/Images/dashboard-icon.svg";
import Lessons from "../../../Assets/Images/lessons-icon.svg";
import TutorSerch from "../../../Assets/Images/tutor-search.svg";
import Messages from "../../../Assets/Images/message-icon.svg";
import Resource from "../../../Assets/Images/resource-icon.svg";
import Review from "../../../Assets/Images/review-icon.svg";
import Feedback from "../../../Assets/Images/feedback-icon.svg";
import MyAccount from "../../../Assets/Images/profile-icon.svg";

const ProfileNav = () => {
  return (
    <div className="profile-nav-wrap">
      <div className="container">
        <ul>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Dashboard} alt="Dashboard-Icon" />
              </div>
              <div className="menu-title">DASHBOARD</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Lessons} alt="Lessons-Icon" />
              </div>
              <div className="menu-title">LESSONS</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={TutorSerch} alt="TutorSerch-Icon" />
              </div>
              <div className="menu-title">TUTOR SEARCH</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Messages} alt="Messages-Icon" />
              </div>
              <div className="menu-title">MESSAGES</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Resource} alt="Resource-Icon" />
              </div>
              <div className="menu-title">RESOURCE LIBRARY</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Review} alt="Review-Icon" />
              </div>
              <div className="menu-title">REVIEWS</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={Feedback} alt="Feedback-Icon" />
              </div>
              <div className="menu-title">FEEDBACK</div>
            </Link>
          </li>
          <li>
            <Link>
              <div className="menu-link">
                <img src={MyAccount} alt="MyAccount-Icon" />
              </div>
              <div className="menu-title">MY ACCOUNT</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;
