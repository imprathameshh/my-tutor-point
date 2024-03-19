import React, { useState } from "react";
import ForgotPasswordSchemas from "../../schemas/ForgotPasswordSchema";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

//IMPORT IMAGE
import LoginBanner from "../../Assets/Images/login-banner.jpg";
import EmailIcon from "../../Assets/Images/email-icon.svg";

import { useFormik } from "formik";
import axios from "axios";

const ForgotPassword = () => {
  const { token } = useParams();
  console.log(token);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setErrors,
    errors: formikErrors,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchemas,
    onSubmit: async (values, actions) => {
      setLoading(true);

      try {
        const response = await axios
          .post(`http://146.190.72.174:5006/api/forgot-password`, {
            email: values.email,
          })
          .then((response) => {
            console.log(response);
            actions.resetForm();
            navigate("/thankyou");
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
  console.log(errors);
  // VALIDACTION END
  return (
    <div className="section-wrap">
      <div className="container">
        <div className="section-contant">
          <div className="section-left">
            <div className="banner-left-img">
              <img src={LoginBanner} />
            </div>
          </div>
          <div className="section-right">
            <div className="section-form">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="section-header">
                  <h1>Forgot password</h1>
                  <p>
                    To reset your password, please enter the email address
                    associated with your account below.
                  </p>
                </div>
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
                        errors.email && touched.email ? "input-error" : ""
                      }
                    />
                    <img src={EmailIcon} alt="email-icon" />
                    {errors.email && touched.email && (
                      <span className="error-mes">{errors.email}</span>
                    )}
                    {formikErrors.backend && (
                      <span className="error-mes">{formikErrors.backend}</span>
                    )}
                  </div>
                </div>
                <div className="submit-container">
                  <button disabled={loading} type="submit" value="Submit">
                    Submit
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
