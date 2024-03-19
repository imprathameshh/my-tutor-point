import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { useFormik } from "formik";
import { apiHeaders, isLoggedIn, currentUser } from "../../../helper";
import ClipLoader from "react-spinners/ClipLoader";

import "./personal-info.css";
//IMPORT IMAGE
import Datepicker from "../../../Assets/Images/datepicker-icon.svg";
import PersonalSchema from "./PersonalSchema";
import { toast } from "react-toastify";
// import { current } from "@reduxjs/toolkit";

const PersoInfo = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState();

  //UPLOAD A FILE START
  const [file, setFile] = useState();
  function handleChanges(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  // UPLOAD FILE END
  //GET A URL END
  const [personalInfo, setPersonalInfo] = useState({});
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "http://146.190.72.174:5006/api/student/get-personal-information",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPersonalInfo(response.data.personal_information);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
    fetchPersonalInfo();
  }, []);
  //GET A URL END
  // VALIDACTION START
  const [loading, setLoading] = useState(false);
  const {
    values,
    errors: formikErrors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldTouched,
    setFieldValue,
    setErrors,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      // Personal Details Start
      firstname: personalInfo?.first_name,
      lastname: personalInfo?.last_name,
      dob: "",
      gender: "",
      file: "",
      email: currentUser.email,
      // Personal Details End
      timezone: "Asia/Kolkata",
      currency: "INR",
      // Contact Details Start
      house_no: "",
      street: "",
      city: personalInfo.city,
      country: personalInfo.country,
      zip: "",
      mobile: personalInfo.mobile,
      // Contact Details End
      // Legal Guardian Details Start
      guardian_first_name: "",
      guardian_last_name: "",
      guardian_dob: "",
      guardian_gender: "",
      guardian_email: "",
      guardian_mobile: "",
      // Legal Guardian Details Start
      guardian_relationship: "",
      guardian_relationship_other: "",
      // Personal Details Start
      guardian_house_no: "",
      guardian_street: "",
      guardian_city: "",
      guardian_country: "",
      guardian_postal: "",
      guardian_same_address: false,
      // Personal Details End
    },
    validationSchema: PersonalSchema,
    onSubmit: async (values, actions) => {
      // console.log(values);
      setLoading(true);
      try {
        const token = localStorage.getItem("accesstoken");
        const response = await axios.post(
          "http://146.190.72.174:5006/api/student/update-personal-information",
          {
            // Personal Details Start
            first_name: values.firstname,
            last_name: values.lastname,
            dob: values.dob,
            gender: values.gender,
            email: values.email,
            file: values.file,
            // Personal Details End
            timezone: "Asia/Kolkata",
            currency: "INR",
            // Contact Details End
            house_no: values.house_no,
            city: values.city,
            mobile: values.mobile,
            country: values.country,
            street: values.street,
            postal: values.zip,
            // Contact Details End
            guardian_first_name: values.guardian_first_name,
            guardian_last_name: values.guardian_last_name,
            guardian_dob: values.guardian_dob,
            guardian_gender: values.guardian_gender,
            guardian_email: values.guardian_email,
            guardian_mobile: values.guardian_mobile,
            guardian_relationship: values.guardian_relationship,
            guardian_relationship_other: values.guardian_relationship_other,
            guardian_house_no: values.guardian_house_no,
            guardian_street: values.guardian_street,
            guardian_city: values.guardian_city,
            guardian_country: values.guardian_country,
            guardian_postal: values.guardian_postal,
            guardian_same_address: false,
          },
          {
            ...apiHeaders,
          }
        );
        console.log(response);
        // actions.resetForm();
        props.toggle(1);
        toast.success("Record Updated Sucessfully");
        setLoading(false);
      } catch (error) {
        console.log("Submission Error:", error);
        if (error.response) {
          setErrors({
            backend: error.response.data.errors.email || "An error occurred",
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });
  // VALIDACTION END
  console.log(formikErrors);

  return (
    <div className="personal-info-wrap">
      <div className="container">
        <div className="personal-info-form ">
          <div className="form-wrap-main">
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* STUDENT DETAIL START  */}
              <div className="form-wrap">
                {/* TITLE START  */}
                <div className="form-title">
                  <h2>Personal Details (Student)</h2>
                </div>
                {/* TITLE END  */}
                <div className="form-section">
                  <div className="form-section-left">
                    <div className="row">
                      {/* FIRST NAME START  */}
                      <div className="col-3">
                        <div className="input-group">
                          <label>First Name* </label>
                          <input
                            type="text"
                            autoComplete="off"
                            name="firstname"
                            id="firstname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                            className={
                              formikErrors.firstname && touched.firstname
                                ? "input-error"
                                : ""
                            }
                          />
                          {formikErrors.firstname && touched.firstname && (
                            <span className="error-mes">
                              {formikErrors.firstname}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* FIRST NAME END  */}
                      {/* LAST NAME START  */}
                      <div className="col-3">
                        <div className="input-group">
                          <label>Last Name* </label>
                          <input
                            type="text"
                            autoComplete="off"
                            name="lastname"
                            id="lastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                            className={
                              formikErrors.lastname && touched.lastname
                                ? "input-error"
                                : ""
                            }
                          />
                          {formikErrors.lastname && touched.lastname && (
                            <span className="error-mes">
                              {formikErrors.lastname}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* LAST NAME END  */}
                      {/* DATE START  */}
                      <div className="col-3">
                        <div className="input-group">
                          <label>Date of Birth </label>
                          <div className="datepicker-wrap">
                            <DatePicker
                              selected={values.dob}
                              onChange={(date) =>
                                setValues({ ...values, dob: date })
                              }
                              // onChange={handleChange}
                              dateFormat="dd/MM/yyyy"
                              maxDate={new Date()}
                              placeholderText="DD / MM / YYYY"
                              className={`datepicker ${
                                formikErrors.dob && touched.dob
                                  ? "input-error"
                                  : ""
                              }`}
                              name="dob"
                            />
                            {formikErrors.dob && touched.dob && (
                              <span className="error-mes">
                                {formikErrors.dob}
                              </span>
                            )}
                            <div className="datepicker-icon">
                              <img src={Datepicker} alt="datepicker-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* DATE END */}
                      {/* GENDER START  */}
                      <div className="col-3">
                        <div className="input-group">
                          <label>Gender </label>
                          <div className="radio-btn-wrap">
                            <label>
                              <input
                                type="radio"
                                value="male"
                                name="gender"
                                onChange={handleChange}
                              />
                              Male
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleChange}
                              />
                              Female
                            </label>
                            {formikErrors.gender && touched.gender && (
                              <span className="error-mes">
                                {formikErrors.gender}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* GENDER END  */}
                    </div>
                    <div className="col-6">
                      {/* EMAIL START  */}
                      <div className="input-group">
                        <label>Email* </label>
                        <input
                          type="email"
                          autoComplete="off"
                          name="email"
                          id="email"
                          value={values.email}
                        />
                      </div>
                      {/* EMAIL END  */}
                    </div>
                  </div>
                  {/* PROFILE PIC START  */}
                  <div className="form-section-right">
                    <div className="col-6 photo-upload">
                      <div className="input-group">
                        <label>Profile Photo </label>
                        <input
                          type="file"
                          name="file"
                          onChange={(event) => {
                            setFieldValue("file", event.target.files[0]);
                            setFile(URL.createObjectURL(event.target.files[0]));
                          }}
                          // onChange={handleChange}
                        />
                        {/* {formikErrors.file && touched.file && (
                          <span className="error-mes">{formikErrors.file}</span>
                        )} */}
                        <div className="img-preview">
                          {file && <img src={file} alt="Preview" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* PROFILE PIC START  */}
                </div>
              </div>
              {/* STUDENT DETAIL END  */}
              {/* CONTACT DETAIL START  */}
              <div className="form-wrap">
                {/* TITLE START  */}
                <div className="form-title">
                  <h2>Contact Details</h2>
                </div>
                {/* TITLE END  */}
                {/* CONTACT DETAIL START  */}
                <div className="form-section">
                  <div className="form-section-left">
                    <div className="input-group">
                      <label>House / Apartment Number </label>
                      <input
                        type="text"
                        name="house_no"
                        id="house_no"
                        onChange={handleChange}
                        value={values.house_no}
                      />
                    </div>
                    <div className="input-group">
                      <label>City / Town* </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={values.city}
                      />
                    </div>
                    <div className="input-group">
                      <label>Postal / Zip Code / PO Box </label>
                      <input
                        type="text"
                        autoComplete="off"
                        name="zip"
                        id="zip"
                        onChange={handleChange}
                        value={values.zip}
                      />
                    </div>
                  </div>
                  <div className="form-section-right">
                    <div className="input-group">
                      <label>Street / Road Name </label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        onChange={handleChange}
                        value={values.street}
                      />
                    </div>
                    <div className="input-group">
                      <label>Country* </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={values.country}
                      />
                    </div>
                    {/* MOBILE NO START */}
                    <div className="input-group">
                      <label>Mobile Number </label>
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
                        {formikErrors.mobile && touched.mobile && (
                          <span className="error-mes">
                            {formikErrors.mobile}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* MOBILE NO END */}
                  </div>
                </div>
              </div>
              {/* CONTACT DETAIL END  */}
              <div className="form-wrap">
                {/* GUARDIAN DETAILS START  */}
                <div className="form-title">
                  <h2>Legal Guardian Details</h2>
                  <div className="title-info">
                    Legal guardians must be 18 years of age or older.
                  </div>
                </div>
                <div className="form-section">
                  <div className="col-4">
                    <div className="input-group">
                      <label>First Name </label>
                      <input
                        type="text"
                        autoComplete="off"
                        name="guardian_first_name"
                        id="guardian_first_name"
                        onChange={handleChange}
                        value={values.guardian_first_name}
                      />
                    </div>
                    <div className="input-group">
                      <label>Email </label>
                      <input
                        type="email"
                        autoComplete="off"
                        name="guardian_email"
                        id="guardian_email"
                        onChange={handleChange}
                        value={values.guardian_email}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-group">
                      <label>Last Name </label>
                      <input
                        type="text"
                        autoComplete="off"
                        name="guardian_last_name"
                        id="guardian_last_name"
                        onChange={handleChange}
                        value={values.guardian_last_name}
                      />
                    </div>
                    <div className="input-group">
                      <label>Mobile Number </label>
                      <div className="form-group countery-code">
                        <PhoneInput
                          type="tel"
                          autoComplete="off"
                          name="guardian_mobile"
                          id="guardian_mobile"
                          placeholder="Enter your phone number"
                          country={"in"}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-group">
                      <label>Gender </label>
                      <div className="radio-btn-wrap">
                        <label>
                          <input
                            type="radio"
                            value="male"
                            name="guardian_gender"
                            onChange={handleChange}
                          />
                          Male
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="female"
                            name="guardian_gender"
                            onChange={handleChange}
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* GUARDIAN DETAILS END  */}
                {/* STUDENT RELECTION START  */}
                <div className="student-relaction">
                  <div className="form-title">
                    <h2>Relationship with student</h2>
                  </div>
                  {/* GENDER START  */}
                  <div className="input-group">
                    <div className="radio-btn-wrap">
                      <label>
                        <input
                          type="radio"
                          value="mother"
                          name="guardian_relationship"
                          onChange={handleChange}
                        />
                        Mother
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="father"
                          name="guardian_relationship"
                          onChange={handleChange}
                        />
                        Father
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="brother-sister"
                          name="guardian_relationship"
                          onChange={handleChange}
                        />
                        Brother/Sister
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="other"
                          name="guardian_relationship"
                        />
                        Other
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="guardian_relationship"
                          id="other"
                          autoComplete="off"
                          placeholder="Please Specify"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* GENDER END  */}
                </div>
                {/* STUDENT RELECTION END  */}
                {/* REGISTERED ADDRESS START  */}
                <div className="registered-address">
                  <div className="form-title">
                    <h2>Personal Details (Student)</h2>
                    <div className="checkbox-wrap">
                      <input type="checkbox" name="checkbox" />
                      <label>
                        Tick if legal guardian address is the same above, if
                        not, please fill the details below
                      </label>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="form-section-left">
                      <div className="input-group">
                        <label>House / Apartment Number </label>
                        <input
                          type="text"
                          name="guardian_house_no"
                          id="house-no"
                          onChange={handleChange}
                          value={values.guardian_house_no}
                        />
                      </div>
                      <div className="input-group">
                        <label>City / Town </label>
                        <input
                          type="text"
                          name="guardian_city"
                          id="guardian_city"
                          onChange={handleChange}
                          value={values.guardian_city}
                        />
                      </div>
                      <div className="input-group">
                        <label>Postal / Zip Code / PO Box </label>
                        <input
                          type="text"
                          autoComplete="off"
                          name="guardian_postal"
                          id="zip"
                          onChange={handleChange}
                          value={values.guardian_postal}
                        />
                      </div>
                    </div>
                    <div className="form-section-right">
                      <div className="input-group">
                        <label>Street / Road Name </label>
                        <input
                          type="text"
                          name="guardian_street"
                          id="street"
                          onChange={handleChange}
                          value={values.guardian_street}
                        />
                      </div>
                      <div className="input-group">
                        <label>Country </label>
                        <input
                          type="text"
                          name="guardian_country"
                          id="Country"
                          onChange={handleChange}
                          value={values.guardian_country}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* REGISTERED ADDRESS START  */}
              </div>
              {/* CONTACT DETAIL START  */}
              {/* BUTTON WRAP START  */}
              <div className="submit-button submit-container ">
                <button disabled={loading} type="submit" value="submit">
                  Update
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
              {/* BUTTON WRAP END  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersoInfo;
