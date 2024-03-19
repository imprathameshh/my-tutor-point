import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { currentUser } from "../../helper";

//STYLE
import "./header.css";

const Header = () => {
  //STICKY HEADER START
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const location = useLocation();
  console.log({ href: location.pathname });
  //STICKY HEADER END
  //DROPDOWN MENU START
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  //DROPDOWN MENU END
  //LOGOUT START
  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("");
    window.location.replace("/");
  };
  //LOGOUT END
  //GET USERNAME CODE START
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accesstoken"))
  );
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("accesstoken")));
  }, [location.pathname]);
  //GET USERNAME CODE END
  return (
    <div className={`header-wrap ${isSticky ? "sticky" : ""}`}>
      <header>
        <div className="container">
          <nav>
            <div className="logo">
              <svg
                id="logo"
                xmlns="http://www.w3.org/2000/svg"
                width="215"
                height="66.625"
                viewBox="0 0 215 66.625"
              >
                <g
                  id="Group_1"
                  data-name="Group 1"
                  transform="translate(0 0.011)"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M182.58,234.018l23.611-23.611-12.546-12.546-23.611,23.611L158.181,209.62a.261.261,0,0,1-.031,0L144.8,203.083l6.526,13.339a.211.211,0,0,1-.005.028l11.869,11.869L139.577,251.93l12.544,12.545,23.611-23.611,17.41,17.41c1.528,1.529,4.307,1.235,6.194-.652s2.18-4.667.652-6.195Zm-33.968-27.354h0l2.81,1.648,3.452,1.762-3.085,3.085Zm4.041,8.512,4.239-4.238,11.84,11.84-4.238,4.239Zm21.117,25.011-1.829,1.829-1.789-1.788-.66.66,1.788,1.788-1.83,1.831-1.789-1.789-.66.661,1.789,1.788-1.83,1.83-1.788-1.789-.66.66,1.788,1.789-1.83,1.83-3.814-3.813-.66.66,3.814,3.813-1.83,1.83-1.789-1.788-.66.66,1.789,1.788-1.83,1.83-1.789-1.788-.66.66,1.789,1.788L157,256.958l-1.788-1.789-.66.66,1.788,1.789-1.83,1.829-1.788-1.788-.66.66,1.788,1.789-1.726,1.725-9.9-9.9L193.646,200.5l9.9,9.9-1.726,1.726-3.813-3.814-.66.66,3.813,3.814-1.83,1.829-1.788-1.788-.66.66,1.788,1.789-1.83,1.83-1.789-1.788-.66.66,1.789,1.788-1.83,1.83-1.789-1.789-.66.661,1.789,1.788-1.831,1.83-1.788-1.788-.66.66,1.788,1.789-1.829,1.829-3.814-3.813-.66.66,3.814,3.813-1.83,1.83-1.789-1.788-.66.66,1.789,1.788-1.831,1.831-1.788-1.789-.66.66,1.788,1.789-1.83,1.83-1.788-1.789-.66.66,1.788,1.789-1.83,1.83-1.789-1.788-.66.66,1.789,1.788-1.83,1.83-3.814-3.814-.66.66,3.814,3.814-1.831,1.83-1.788-1.788-.66.66Zm3.267-.627,4.239-4.238,12.807,12.807-4.238,4.239Zm21,16.76c-1.148,1.147-2.791,1.447-3.587.651l-3.3-3.3,4.239-4.238,3.3,3.3C199.481,253.527,199.183,255.169,198.034,256.319Z"
                    transform="translate(-139.577 -197.861)"
                    fill="#333"
                  ></path>
                </g>
                <g
                  id="Group_2"
                  data-name="Group 2"
                  transform="translate(66.181 28.489)"
                >
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M313.652,272.989h2.414l3.5,9.494h.072l3.522-9.494h2.4l.572,12.123h-1.842l-.232-6.562c-.054-1.377-.036-2.289-.018-3.29h-.071l-3.612,9.852H318.8l-3.612-9.852h-.071c.018,1,.035,1.913-.018,3.29l-.233,6.562H313.08Z"
                    transform="translate(-313.08 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M353.915,272.989h2.163l2.772,5.275,2.807-5.275H363.7l-3.969,6.973v5.15h-1.86v-5.15Z"
                    transform="translate(-338.339 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M392.781,272.989H401.9v1.555H398.27v10.568h-1.86V274.544h-3.63Z"
                    transform="translate(-362.38 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_5"
                    data-name="Path 5"
                    d="M431.235,282.93c.734-.733.876-2,.876-3.63v-6.311h1.824v6.652a7.491,7.491,0,0,1-.661,3.665c-.841,1.5-2.432,1.985-4.2,1.985a4.489,4.489,0,0,1-4.2-1.985,7.22,7.22,0,0,1-.68-3.665v-6.652h1.86V279.3c0,1.752.178,2.915.912,3.63a2.942,2.942,0,0,0,2.164.716A2.777,2.777,0,0,0,431.235,282.93Z"
                    transform="translate(-381.808 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_6"
                    data-name="Path 6"
                    d="M457.2,272.989h9.119v1.555h-3.63v10.568h-1.859V274.544H457.2Z"
                    transform="translate(-402.225 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_7"
                    data-name="Path 7"
                    d="M491.426,285c-3.415,0-5.632-2.521-5.632-6.1,0-3.5,2.146-6.384,5.811-6.384,3.415,0,5.633,2.521,5.633,6.1C497.238,282.121,495.092,285,491.426,285Zm.179-10.853c-2.486,0-3.862,2.038-3.862,4.756,0,2.7,1.412,4.47,3.683,4.47,2.5,0,3.862-2.056,3.862-4.756S493.876,274.147,491.605,274.147Z"
                    transform="translate(-419.914 -272.519)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M525.644,284.967V272.879c1.073-.053,2.52-.125,3.218-.125,3.058,0,4.667,1.216,4.667,3.415a3.381,3.381,0,0,1-2.86,3.361l4.22,5.436H532.6l-3.862-5.114h-1.252v5.114Zm1.841-6.562c.465.018,1.144,0,1.4,0,1.751,0,2.682-.715,2.682-2.092,0-1.359-.913-2.092-2.593-2.092-.465,0-.894.018-1.484.054Z"
                    transform="translate(-444.563 -272.664)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M569.2,284.967V272.879c.966-.053,2.378-.125,3.058-.125,2.985,0,4.792,1.144,4.792,3.648,0,2.468-1.735,3.7-4.488,3.7-.321,0-.983-.018-1.519-.072v4.935Zm1.842-6.366c.5.036,1.126.036,1.394.036,1.77,0,2.682-.786,2.682-2.2s-.912-2.2-2.86-2.2c-.323,0-.734,0-1.216.036Z"
                    transform="translate(-471.504 -272.664)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M631.281,272.989v12.123h-1.842V272.989Z"
                    transform="translate(-508.767 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_11"
                    data-name="Path 11"
                    d="M645.9,272.989h1.68l4.757,6.795c.464.679,1.108,1.7,1.394,2.2h.072c-.072-1.037-.072-1.806-.072-2.843v-6.151h1.859v12.123h-1.68l-4.757-6.795c-.482-.68-1.109-1.7-1.413-2.2h-.072c.072,1.037.072,1.806.072,2.843v6.151H645.9Z"
                    transform="translate(-518.946 -272.81)"
                    fill="#333"
                  ></path>
                  <path
                    id="Path_12"
                    data-name="Path 12"
                    d="M679.322,272.989h9.119v1.555h-3.63v10.568h-1.86V274.544h-3.63Z"
                    transform="translate(-539.622 -272.81)"
                    fill="#333"
                  ></path>
                </g>
                <g
                  id="Group_3"
                  data-name="Group 3"
                  transform="translate(175.292 31.375)"
                >
                  <path
                    id="Path_13"
                    data-name="Path 13"
                    d="M602.61,287.8a3.448,3.448,0,0,1-3.482-3.77c0-2.167,1.327-3.946,3.593-3.946a3.448,3.448,0,0,1,3.482,3.77C606.2,286.022,604.877,287.8,602.61,287.8Z"
                    transform="translate(-599.128 -280.086)"
                    fill="#ea9500"
                  ></path>
                </g>
                <g
                  id="Group_4"
                  data-name="Group 4"
                  transform="translate(12.07 12.25)"
                >
                  <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M177.257,229.947a12.373,12.373,0,0,1-6.036,6.082Z"
                    transform="translate(-171.221 -229.947)"
                    fill="#333"
                  ></path>
                </g>
                <g
                  id="Group_5"
                  data-name="Group 5"
                  transform="translate(12.212 12.223)"
                >
                  <path
                    id="Path_15"
                    data-name="Path 15"
                    d="M171.593,232.962l3.085-3.085A11.5,11.5,0,0,1,171.593,232.962Z"
                    transform="translate(-171.593 -229.877)"
                    fill="#fff"
                  ></path>
                </g>
                <g
                  id="Group_6"
                  data-name="Group 6"
                  transform="translate(14.713 14.725)"
                >
                  <rect
                    id="Rectangle_4"
                    data-name="Rectangle 4"
                    width="1.412"
                    height="16.694"
                    transform="translate(0 0.998) rotate(-45)"
                    fill="#333"
                  ></rect>
                </g>
                <g
                  id="Group_7"
                  data-name="Group 7"
                  transform="translate(38.785 38.772)"
                >
                  <rect
                    id="Rectangle_5"
                    data-name="Rectangle 5"
                    width="1.412"
                    height="18.547"
                    transform="translate(0 0.998) rotate(-45)"
                    fill="#333"
                  ></rect>
                </g>
                <g
                  id="Group_8"
                  data-name="Group 8"
                  transform="translate(0.058)"
                >
                  <path
                    id="Path_16"
                    data-name="Path 16"
                    d="M152.24,264.454l-12.51-12.511,54.11-54.11,12.234,12.234Zm-9.849-12.511,9.842,9.842,51.184-51.712-9.578-9.579Z"
                    transform="translate(-139.729 -197.832)"
                    fill="#333"
                  ></path>
                </g>
                <g
                  id="Group_9"
                  data-name="Group 9"
                  transform="translate(5.226 5.232)"
                >
                  <path
                    id="Path_17"
                    data-name="Path 17"
                    d="M153.277,211.548l2.93,5.988,3.189-2.994Z"
                    transform="translate(-153.277 -211.548)"
                    fill="#ea9500"
                  ></path>
                </g>
                <g
                  id="Group_10"
                  data-name="Group 10"
                  transform="translate(8.156 8.226)"
                >
                  <path
                    id="Path_18"
                    data-name="Path 18"
                    d="M164.147,219.4a6.317,6.317,0,0,1-3.189,2.994Z"
                    transform="translate(-160.958 -219.398)"
                    fill="#ea9500"
                  ></path>
                </g>
              </svg>
            </div>
            {isLoggedIn ? (
              <div className="user-dropdown">
                <div className="user-name" onClick={toggleDropdown}>
                  {currentUser.first_name}
                </div>
                {showDropdown && (
                  <div className="dropdown-content">
                    {/* Dropdown content goes here */}
                    <ul>
                      <li>Settings</li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                    {/* Dropdown content goes here */}
                  </div>
                )}
              </div>
            ) : (
              <div className="router-link ">
                <ul>
                  <li>
                    <NavLink
                      to="/signup"
                      className={(props) => (props.isActive ? "active" : "")}
                    >
                      Sign up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className={(props) => (props.isActive ? "active" : "")}
                    >
                      Log in
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
