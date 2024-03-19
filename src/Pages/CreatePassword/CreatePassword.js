import React, { useState } from "react";
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreatePasswordSchema from "../../schemas/CreatePasswordSchema";

//Import Image
import LoginBanner from "../../Assets/Images/login-banner.jpg";
import PasswordIcon from "../../Assets/Images/password-icon.svg";
import axios from "axios";

//SERCHPARAMS FROM URL
function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
const CreatePassword = () => {
  let query = useQuery();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true);
    console.log(values);
    console.log(actions);
    axios
      .post("http://146.190.72.174:5006/api/create-password", {
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      })
      .then((response) => {
        console.log(response);
        actions.resetForm();
        navigate("/");
        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
        setLoading(false);
      });
  };
  // VALIDACTION START
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: query.get("email"),
      password: "",
      confirmPassword: "",
    },
    validationSchema: CreatePasswordSchema,
    onSubmit,
  });
  console.log(errors);
  // VALIDACTION END

  return (
    <div>
      <div className="section-wrap">
        <section>
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
                      <h1>Let's Create a Password</h1>
                    </div>
                    <div className="form-inputs">
                      {/* EMAIL START  */}
                      {/* <div className="form-group">
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
                      </div> */}
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
                            errors.password && touched.password
                              ? "input-error"
                              : ""
                          }
                        />
                        <img src={PasswordIcon} alt="password-icon" />
                        {errors.password && touched.password && (
                          <span className="error-mes">{errors.password}</span>
                        )}
                      </div>
                      {/* PASSWORD END */}
                      {/*CONFORM PASSWORD START */}
                      <div className="form-group">
                        <input
                          type="password"
                          autoComplete="off"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.confirmPassword && touched.confirmPassword
                              ? "input-error"
                              : ""
                          }
                        />
                        <img src={PasswordIcon} alt="password-icon" />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <span className="error-mes">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                      {/* CONFORM PASSWORD END */}
                    </div>

                    <div className="submit-container">
                      <button disabled={loading} type="submit" value="Submit">
                        Confirm Password
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
        </section>
      </div>
    </div>
  );
};

export default CreatePassword;
