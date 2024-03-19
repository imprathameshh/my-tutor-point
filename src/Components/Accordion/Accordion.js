import React, { useState } from "react";
import Availability from "../StudentProfile/Availability/Availability";
import PersoInfo from "../StudentProfile/PersonalInfo/PersonalInfo";
import Preference from "../StudentProfile/Preference/Preference";
import LearningPreference from "../StudentProfile/LearningPreference/LearningPreference";

import "./accordion.css";
import AccordionArrow from "../../Assets/Images/accordion-arrow.svg";

const Accordion = () => {
  const [openAccordion, setOpenAccordion] = useState([
    true,
    false,
    false,
    false,
  ]);

  const toggleAccordion = (index) => {
    setOpenAccordion((prevOpenAccordion) =>
      prevOpenAccordion.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className={`accordion-wrap `}>
      <div className="container">
        <div className="accordion-main">
          <div
            className={`accordion-component ${
              openAccordion[0] ? "accordion-opened" : ""
            }`}
          >
            <div className="accordion-title" onClick={() => toggleAccordion(0)}>
              PERSONAL INFORMATION
              <span className="accordion-arrow">
                <img src={AccordionArrow} alt="accordion-arrow" />
              </span>
            </div>
            {openAccordion[0] && <PersoInfo toggle={toggleAccordion} />}
          </div>
          <div
            className={`accordion-component ${
              openAccordion[1] ? "accordion-opened" : ""
            }`}
          >
            <div className="accordion-title" onClick={() => toggleAccordion(1)}>
              AVAILABILITY
              <span className="accordion-arrow">
                <img src={AccordionArrow} alt="accordion-arrow" />
              </span>
            </div>
            {openAccordion[1] && <Availability toggle={toggleAccordion} />}
          </div>
          <div
            className={`accordion-component ${
              openAccordion[2] ? "accordion-opened" : ""
            }`}
          >
            <div className="accordion-title" onClick={() => toggleAccordion(2)}>
              MY PREFERENCES
              <span className="accordion-arrow">
                <img src={AccordionArrow} alt="accordion-arrow" />
              </span>
            </div>
            {openAccordion[2] && <Preference toggle={toggleAccordion} />}
          </div>
          <div
            className={`accordion-component ${
              openAccordion[3] ? "accordion-opened" : ""
            }`}
          >
            <div className="accordion-title" onClick={() => toggleAccordion(3)}>
              EDUCATION PROFILE AND LEARNING PREFERENCES
              <span className="accordion-arrow">
                <img src={AccordionArrow} alt="accordion-arrow" />
              </span>
            </div>
            {openAccordion[3] && (
              <LearningPreference toggle={toggleAccordion} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
