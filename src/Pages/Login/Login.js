import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import LoginSchema from "../../schemas/LoginSchema";
import ClipLoader from "react-spinners/ClipLoader";

// Import Image
import LoginBanner from "../../Assets/Images/login-banner.jpg";
import EmailIcon from "../../Assets/Images/email-icon.svg";
import PasswordIcon from "../../Assets/Images/password-icon.svg";
import axios from "axios";
import { apiHeaders, isLoggedIn, currentUser } from "../../helper";
import StudentProfile from "../StudentProfile/StudentProfile";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // VALIDATION START
  const {
    values,
    errors: formikErrors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setErrors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      device: "test",
      device_name: "rutul",
      location: "ahmedabad",
      browser: "mac",
      is_mobile: "0",
      latitude: "34",
      longitude: "3",
      timezone: "Asia/Kolkata",
      currency: "INR",
      profile_ip: "192.168.0.1",
      country: "India",
      city: "Ahmedabad",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const response = await axios
          .post("http://146.190.72.174:5006/api/login", {
            email: values.email,
            password: values.password,
            device: "test",
            device_name: "rutul",
            location: "ahmedabad",
            browser: "mac",
            is_mobile: "0",
            latitude: "34",
            longitude: "3",
            timezone: "Asia/Kolkata",
            currency: "INR",
            profile_ip: "192.168.0.1",
            country: "India",
            city: "Ahmedabad",
          })
          .then((response) => {
            if (response.data.code === 200) {
              localStorage.setItem("accesstoken", response.data.token);
            }
            if (response.data.code === 200) {
              localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data.user)
              );
            }
            console.log(response.data.user);
            // actions.resetForm();
            navigate("/studentProfile");
            setLoading(false);
          });
      } catch (error) {
        console.log(error);

        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setErrors({
            backend: error.response.data.message || "An error occurred",
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
  //FROM HEALPER JS
  if (isLoggedIn) {
    return <Navigate to="/studentProfile" />;
  }

  return (
    <div className="section-wrap">
      <section>
        <div className="container">
          <div className="section-contant">
            <div className="section-left">
              <div className="banner-left-img">
                <img src={LoginBanner} alt="Login Banner" />
              </div>
            </div>
            <div className="section-right">
              <div className="section-form">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="section-header">
                    <h1>welcome back</h1>
                    <p>
                      It’s normal to miss My Tutor Point, we appreciate that
                      feeling
                    </p>
                  </div>
                  {/* EMAIL START  */}
                  <div className="form-inputs">
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
                    </div>
                    {/* EMAIL END  */}
                    {/* PASSWORD START */}
                    <div className="form-group">
                      <input
                        type="password"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          formikErrors.password && touched.password
                            ? "input-error"
                            : ""
                        }
                      />
                      <img src={PasswordIcon} alt="password-icon" />
                      {formikErrors.password && touched.password && (
                        <span className="error-mes">
                          {formikErrors.password}
                        </span>
                      )}
                      {formikErrors.backend && (
                        <span className="error-mes">
                          {formikErrors.backend}
                        </span>
                      )}
                    </div>

                    {/* PASSWORD END */}
                  </div>
                  <div className="checklist">
                    <div className="checkbox-wrap">
                      <input type="checkbox" name="checkbox" />
                      <label>Keep me logged in</label>
                    </div>
                    <div className="forgot-password">
                      <Link to="/forgotpassword">Forgot password?</Link>
                    </div>
                  </div>
                  <div className="submit-container">
                    <button disabled={loading} type="submit" value="Submit">
                      Log In
                      <ClipLoader
                        color={"#fff"}
                        loading={loading}
                        className="loader"
                        size={18}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
