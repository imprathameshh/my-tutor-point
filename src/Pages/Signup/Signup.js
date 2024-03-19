import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignupSchema from "../../schemas/SignupSchema";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

// PHONE AND SELECT BOX LIBRARIES
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";

// IMPORT IMAGE
import SignUp from "../../Assets/Images/signup-banner.jpg";
import EmailIcon from "../../Assets/Images/email-icon.svg";
import UserIcon from "../../Assets/Images/user-icon.svg";
import MobileIcon from "../../Assets/Images/moble-icon.svg";

// STYLE
import "./signup.css";

const Signup = () => {
  // MOBILE NO START
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleOnChange = (value, data) => {
    setPhoneNumber(value);
  };
  // MOBILE NO END

  // SELECT BOX START
  const options = [
    { value: "google", label: "Google" },
    { value: "twitter", label: " Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "instagram", label: "Instagram" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChanges = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  // SELECT BOX END
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useFormik hook is used to set up form state, validation, and handling form submission.
  // values: Represents the current form field values.
  // errors: Contains validation errors.
  // touched: Indicates which form fields have been touched.
  // handleBlur: Event handler for the blur event on form fields.
  // handleChange: Event handler for the change event on form fields.
  // handleSubmit: Event handler for form submission.
  // setValues, setFieldTouched, setErrors: Functions to manually update
  const {
    values,
    errors: formikErrors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldTouched,
    setErrors,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      selectbox: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const response = await axios
          .post("http://146.190.72.174:5006/api/registration", {
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            mobile: values.mobile,
            hear_from: values.selectbox.value,
            role: "student",
          })
          //Registration Api Call
          .then((response) => {
            console.log(response);
            actions.resetForm();
            navigate("/thankyou");
            setLoading(false);
          });
      } catch (error) {
        // console.log(error);
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setErrors({
            backend: error.response.data.errors.email || "An error occurred",
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        setLoading(false);
      }
    },
  });
  // VALIDATION END

  // Is called to prevent the default form submission behavior.
  // This is a common practice when handling form submissions in React
  // to prevent the page from reloading, which is the default behavior of HTML forms.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="section-wrap signup-wrap">
      <section>
        <div className="container">
          <div className="section-contant">
            <div className="section-left">
              <div className="banner-left-img">
                <img src={SignUp} alt="signup-banner" />
              </div>
            </div>
            <div className="section-right">
              <div className="section-form">
                <form onSubmit={handleFormSubmit} autoComplete="off">
                  <div className="form-inputs">
                    <div className="row">
                      <div className="col-6">
                        {/* FIRST NAME START  */}
                        <div className="form-group">
                          <input
                            type="text"
                            autoComplete="off"
                            name="firstname"
                            id="firstname"
                            placeholder="First Name"
                            value={values.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              formikErrors.firstname && touched.firstname
                                ? "input-error"
                                : ""
                            }
                          />
                          <img src={UserIcon} alt="user-icon" />
                          {formikErrors.firstname && touched.firstname && (
                            <span className="error-mes">
                              {formikErrors.firstname}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* FIRST NAME END  */}
                      {/* LASTNAME START  */}
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            type="text"
                            autoComplete="off"
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              formikErrors.lastname && touched.lastname
                                ? "input-error"
                                : ""
                            }
                          />
                          <img src={UserIcon} alt="user-icon" />
                          {formikErrors.lastname && touched.lastname && (
                            <span className="error-mes">
                              {formikErrors.lastname}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* LASTNAME END  */}
                    {/* EMAIL ADDRESS START  */}
                    <div className="form-group">
                      <input
                        type="email"
                        autoComplete="off"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          formikErrors.email && touched.email
                            ? "input-error"
                            : ""
                        }
                      />
                      <img src={EmailIcon} alt="email-icon" />
                      {formikErrors.email && touched.email && (
                        <span className="error-mes">{formikErrors.email}</span>
                      )}
                      {formikErrors.backend && (
                        <span className="error-mes">
                          {formikErrors.backend}
                        </span>
                      )}
                    </div>
                    {/* EMAIL ADDRESS END  */}
                    {/* MOBILE NO START */}
                    <div className="form-group countery-code">
                      <PhoneInput
                        type="tel"
                        autoComplete="off"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter your phone number"
                        country={"in"}
                        value={values.mobile}
                        onChange={(value) => {
                          setValues((allValues) => {
                            allValues.mobile = value;
                            return allValues;
                          });
                        }}
                        onBlur={() => {
                          setFieldTouched("mobile");
                        }}
                        className={
                          formikErrors.mobile && touched.mobile
                            ? "input-error"
                            : ""
                        }
                      />
                      <img src={MobileIcon} alt="call-icon" />
                      {formikErrors.mobile && touched.mobile && (
                        <span className="error-mes">{formikErrors.mobile}</span>
                      )}
                    </div>
                    {/* MOBILE NO END */}
                    {/* SELECT BOX START */}
                    <div className="form-group">
                      <Select
                        type="text"
                        autoComplete="off"
                        name="selectbox"
                        id="selectbox"
                        onChange={(option) => {
                          setValues((values) => {
                            values.selectbox = option;
                            return values;
                          });
                        }}
                        options={options}
                        className="rect-select-input"
                        classNamePrefix="rect-select"
                        placeholder="Where did you hear about us?"
                        value={values.selectbox}
                        onBlur={() => {
                          setFieldTouched("selectbox");
                        }}
                      />
                      {formikErrors.selectbox && touched.selectbox && (
                        <span className="error-mes">
                          {formikErrors.selectbox}
                        </span>
                      )}
                    </div>
                    {/* SELECT BOX END */}
                  </div>

                  <div className="agreed">
                    <span>
                      By registering through email, Google, or Facebook, you
                      acknowledge that you have read and agreed to our
                      <Link to="#"> Terms & Conditions </Link> and
                      <Link to="#"> Privacy Policy. </Link>
                    </span>
                  </div>
                  {/* SUBMIT START  */}
                  <div className="submit-container">
                    <button disabled={loading} type="submit" value="Submit">
                      SIGN UP
                      {
                        <ClipLoader
                          color={"#fff"}
                          loading={loading}
                          className="loader"
                          size={18}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      }
                    </button>
                  </div>
                  {/* SUBMIT END  */}
                </form>
                <div className="tutor-link">
                  <span>
                    If you are a tutor click <Link to="#">here</Link> to sign
                    up.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
