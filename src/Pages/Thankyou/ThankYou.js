import React from "react";

import SignUp from "../../Assets/Images/signup-banner.jpg";
const ThankYou = () => {
  // VALIDACTION END
  return (
    <div className="section-wrap">
      <section>
        <div className="container">
          <div className="section-contant">
            <div className="section-left">
              <div className="banner-left-img">
                <img src={SignUp} />
              </div>
            </div>
            <div className="section-right">
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: " #C6521E",
                }}
              >
                Thank You...
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
