import React, { useState, useEffect } from "react";
import "./preference.css";
import Select from "react-select";
import PreferenceSchema from "./PreferenceSchema";
import { useFormik } from "formik";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { apiHeaders, isLoggedIn, currentUser } from "../../../helper";
import { toast } from "react-toastify";

const Preference = (props) => {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const looking_to_be_tutored_by = [
    { value: "male_only", label: "Male Only" },
    { value: "female_only", label: "Female Only" },
    { value: "male_or_female", label: "Either Male or Female" },
  ];

  //GET LANGUAGE START
  let languageUrl = `http://146.190.72.174:5006/api/student/get-languages`;
  useEffect(() => {
    setLoading(true);
    axios
      .get(languageUrl, { ...apiHeaders })
      .then((res) => {
        console.log(languages, "lang");
        setLanguages(res.data.languages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const languageOptions = languages.map((item) => {
    return {
      label: item.en_name,
      value: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  });
  //GET LANGUAGE END

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      looking_to_be_tutored_by: "",
      preferred_languages: "",
      want_my_tutor_to_teaches: "",
      deleted_preferred_languages: [],
      deleted_want_my_tutor_to_teaches: [],
    },
    validationSchema: PreferenceSchema,
    onSubmit: (data) => {
      setLoading(true);
      const formData = {
        tutor_to_be_located: "Anywhere in the world",
        looking_to_be_tutored_by: data.looking_to_be_tutored_by.value,
        preferred_languages: [
          {
            id: 86,
            user_id: currentUser.id,
            language_id: data.preferred_languages.value,
            created_at: data.preferred_languages.created_at,
            updated_at: data.preferred_languages.updated_at,
          },
        ],
        want_my_tutor_to_teaches: [
          {
            id: 85,
            user_id: currentUser.id,
            language_id: data.want_my_tutor_to_teaches.value,
            created_at: data.want_my_tutor_to_teaches.created_at,
            updated_at: data.want_my_tutor_to_teaches.updated_at,
          },
        ],
        deleted_preferred_languages: [],
        deleted_want_my_tutor_to_teaches: [],
      };
      console.log(data);

      try {
        axios
          .post(
            "http://146.190.72.174:5006/api/student/update-my-preferences",
            {
              ...formData,
            },
            { ...apiHeaders }
          )
          .then((res) => {
            console.log(res);
            setLoading(false);
            props.toggle(3);
            toast.success("Record Updated Sucessfully");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  console.log(formik.errors);

  return (
    <div className="preference-wrap">
      <div className="container">
        <div className="preference-form">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            {/* ... */}
            <div className="form-wrap-main">
              <div className="form-wrap">
                <div className="form-section">
                  <div className="form-section-left">
                    <div className="input-group">
                      <label>I am looking to be tutored by</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="looking_to_be_tutored_by"
                          id="looking_to_be_tutored_by"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={looking_to_be_tutored_by}
                          onChange={(e) => {
                            formik.setFieldValue("looking_to_be_tutored_by", e);
                          }}
                          onBlur={() => {
                            formik.setFieldTouched("looking_to_be_tutored_by");
                          }}
                        />
                        {formik.errors.looking_to_be_tutored_by &&
                          formik.touched.looking_to_be_tutored_by && (
                            <span className="error-mes">
                              {formik.errors.looking_to_be_tutored_by}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-section">
                  <div className="form-section-left">
                    <div className="input-group">
                      <label>My preferred language is</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="preferred_languages"
                          options={languageOptions}
                          value={languageOptions.find(
                            (option) =>
                              option.value === formik.values.preferred_languages
                          )}
                          onChange={(e) => {
                            formik.setFieldValue("preferred_languages", e);
                          }}
                          id="language"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          onBlur={() => {
                            formik.setFieldTouched("preferred_languages");
                          }}
                        />
                        {formik.errors.preferred_languages &&
                          formik.touched.preferred_languages && (
                            <span className="error-mes">
                              {formik.errors.preferred_languages}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="form-section-right">
                    <div className="input-group">
                      <label>I want my tutor to teach in</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="want_my_tutor_to_teaches"
                          id="want_my_tutor_to_teaches"
                          options={languageOptions}
                          value={languageOptions.find(
                            (option) =>
                              option.value ===
                              formik.values.want_my_tutor_to_teaches
                          )}
                          onChange={(e) => {
                            formik.setFieldValue("want_my_tutor_to_teaches", e);
                          }}
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          onBlur={() => {
                            formik.setFieldTouched("want_my_tutor_to_teaches");
                          }}
                        />
                        {formik.errors.want_my_tutor_to_teaches &&
                          formik.touched.want_my_tutor_to_teaches && (
                            <span className="error-mes">
                              {formik.errors.want_my_tutor_to_teaches}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-button submit-container ">
                  <button disabled={loading} type="submit" value="Submit">
                    CONTINUE
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Preference;
