import React, { useState, useEffect } from "react";
import "./learning_preference.css";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import BudgetIcon from "../../../Assets/Images/budget-icon.svg";
import AddIcon from "../../../Assets/Images/add-icon.svg";
import { useFormik } from "formik";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { apiHeaders } from "../../../helper";
import LearningSchema from "./LearningSchema";
import { toast } from "react-toastify";

const LearningPreference = () => {
  // VALIDACTION START
  const [loading, setLoading] = useState(false);

  //GET LANGUAGE START
  const [studentType, setStudentType] = useState([]);
  const [level, setLanguages] = useState([]);
  const [curriculum, setCurriculums] = useState([]);
  const [help, setHelp] = useState([]);
  const [lookingfor, setLookingFor] = useState([]);
  const [subject, setSubject] = useState([]);
  const [exam, setExam] = useState([]);
  const [frequency, setFrequency] = useState([]);

  // DECLEARING API START
  let studentTypeUrl = `http://146.190.72.174:5006/api/student/get-student-types`;
  let levelUrl = `http://146.190.72.174:5006/api/student/get-student-levels`;
  let curriculumsUrl = `http://146.190.72.174:5006/api/student/get-curriculums`;
  let helpUrl = `http://146.190.72.174:5006/api/student/get-need-help-with`;
  let lookingforUrl = `http://146.190.72.174:5006/api/student/get-looking-for`;
  let subjectUrl = `http://146.190.72.174:5006/api/student/get-subjects`;
  let examUrl = `http://146.190.72.174:5006/api/student/get-exam-boards`;
  let frequencyUrl = `http://146.190.72.174:5006/api/student/get-frequencies`;
  // DECLEARING API END

  useEffect(() => {
    setLoading(true);
    //GETTING API START
    axios
      .all([
        axios.get(studentTypeUrl, { ...apiHeaders }),
        axios.get(levelUrl, { ...apiHeaders }),
        axios.get(curriculumsUrl, { ...apiHeaders }),
        axios.get(helpUrl, { ...apiHeaders }),
        axios.get(lookingforUrl, { ...apiHeaders }),
        axios.get(subjectUrl, { ...apiHeaders }),
        axios.get(examUrl, { ...apiHeaders }),
        axios.get(frequencyUrl, { ...apiHeaders }),
      ])
      //GETTING API END

      .then(
        axios.spread(
          (
            studentTypeResponse,
            levelResponse,
            curriculumResponse,
            helpResponse,
            lookingforResponse,
            subjectResponse,
            examResponse,
            frequencyResponse
          ) => {
            // console.log(levelResponse.data.levels, "Levels");
            // console.log(curriculumResponse.data.curriculums, "Curriculums");
            // console.log(studentTypeResponse.data.levels, "Type");
            console.log(helpResponse.data, "Help");
            // console.log(subjectResponse.data, "suject");

            setStudentType(studentTypeResponse.data.levels);
            setLanguages(levelResponse.data.levels);
            setCurriculums(curriculumResponse.data.curriculums);
            setHelp(helpResponse.data.need_help_with);
            setLookingFor(lookingforResponse.data.looking_for);
            setSubject(subjectResponse.data.subjects);
            setExam(examResponse.data.exam_boards);
            setFrequency(frequencyResponse.data.prepare_types);

            setLoading(false);
          }
        )
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //SELECT BOX VALUE START
  const studentTypeOptions = studentType
    ? studentType.map((item) => ({
        value: item.id,
        label: item.en_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  const levelOptions = level
    ? level.map((item) => ({
        value: item.id,
        label: item.en_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  const curriculumOptions = curriculum
    ? curriculum.map((item) => ({
        value: item.id,
        label: item.en_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user_id: null,
        is_quick_link: 0,
      }))
    : [];
  const lookingforOptions = lookingfor
    ? lookingfor?.map((item) => ({
        value: item.id,
        label: item.en_name,
        user_id: null,
        approved: 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  const helpOptions = help
    ? help?.map((item) => ({
        value: item.id,
        label: item.en_name,
        user_id: null,
        approved: 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];

  const sbbjectOptions = subject
    ? subject?.map((item) => ({
        value: item.id,
        label: item.en_name,
        user_id: null,
        approved: 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  const frequencyOptions = frequency
    ? frequency?.map((item) => ({
        value: item.id,
        label: item.en_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  const examOptions = exam
    ? exam?.map((item) => ({
        value: item.id,
        label: item.en_name,
        user_id: null,
        approved: 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    : [];
  //SELECT BOX VALUE END

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_type_id: "",
      college: "",
      curriculum_id: "",
      student_level_id: "",
      looking_for: [],
      need_help_with: [],
      subject_id: "",
      exam_board_id: "",
      id: 36,
      user_id: 113,
      no_of_sessions: "",
      hourly_budget: "",
      frequency_id: "",
    },
    validationSchema: LearningSchema,
    onSubmit: (data) => {
      setLoading(true);
      const formData = {
        deleted_looking_for: [],
        deleted_need_help_with: [],
        deleted_need_tutions: [],
        student_type_id: data.student_type_id.value,
        college: data.college,
        curriculum_id: data.curriculum_id.value,
        looking_for: Array.isArray(data.looking_for.value)
          ? []
          : [data.looking_for.value],
        need_help_with: Array.isArray(data.need_help_with.value)
          ? []
          : [data.need_help_with.value],
        need_tutions: [
          {
            subject_id: data.subject_id.value ?? "",
            exam_board_id: data.exam_board_id.value ?? "",
            id: 36,
            created_at: "2022-06-28T12:54:26.000000Z",
            frequency_id: data.frequency_id.value ?? "",
            hourly_budget: data.hourly_budget,
            no_of_sessions: data.no_of_sessions,
            updated_at: "2022-06-28T12:54:26.000000Z",
            user_id: data.user_id,
          },
        ],
        student_level_id: data.student_level_id.value,
      };
      // console.log(data);

      try {
        axios
          .post(
            "http://146.190.72.174:5006/api/student/update-educations-and-tutions",
            {
              ...formData,
            },
            { ...apiHeaders }
          )
          .then((res) => {
            console.log(res);
            setLoading(false);
            toast.success("Record Updated Sucessfully");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
  });

  console.log(formik.errors);

  return (
    <div className="learning-preference-wrap">
      <div className="container">
        <div className="learning-preference-form">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="form-wrap-main">
              <div className="form-wrap">
                <div className="form-section">
                  <div className="form-section-left">
                    <div className="input-group">
                      <label>I am a…</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="student_type_id"
                          id="student_type_id"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={studentTypeOptions}
                          onChange={(e) => {
                            formik.setFieldValue("student_type_id", e);
                          }}
                          value={formik.values.student_type_id}
                          onBlur={() => {
                            formik.setFieldTouched("student_type_id");
                          }}
                        />
                        {formik.errors.student_type_id &&
                          formik.touched.student_type_id && (
                            <span className="error-mes">
                              {formik.errors.student_type_id}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Level</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="student_level_id"
                          id="student_level_id"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={levelOptions}
                          onChange={(e) => {
                            formik.setFieldValue("student_level_id", e);
                          }}
                          value={formik.values.student_level_id}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>I need help with</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="need_help_with"
                          id="need_help_with"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={helpOptions}
                          onChange={(e) => {
                            formik.setFieldValue("need_help_with", e);
                          }}
                          value={formik.values.need_help_with}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-section-right">
                    <div className="input-group">
                      <label>I am studying at</label>
                      <div className="form-group">
                        <input
                          type="text"
                          autoComplete="off"
                          name="college"
                          id="college"
                          placeholder="Enter your school/institution name "
                          onChange={formik.handleChange}
                          value={formik.values.college}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Curriculum</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="curriculum_id"
                          id="curriculum_id"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={curriculumOptions}
                          onChange={(e) => {
                            formik.setFieldValue("curriculum_id", e);
                          }}
                          value={formik.values.curriculum_id}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>I am looking for</label>
                      <div className="form-group">
                        <Select
                          type="text"
                          autoComplete="off"
                          name="looking_for"
                          id="looking_for"
                          className="rect-select-input"
                          classNamePrefix="rect-select"
                          placeholder="Select..."
                          options={lookingforOptions}
                          onChange={(e) => {
                            formik.setFieldValue("looking_for", e);
                          }}
                          value={formik.values.looking_for}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* NEED TUITION START  */}
                <div className="form-title">
                  <h2>Legal Guardian Details</h2>
                </div>
                {/* NEED TUITION START  */}
                <div className="need-tuition">
                  <div className="form-section">
                    <div className="form-section-left">
                      <div className="input-group">
                        <label>Subject</label>
                        <div className="form-group">
                          <Select
                            type="text"
                            autoComplete="off"
                            name="subject_id"
                            id="subject_id"
                            className="rect-select-input"
                            classNamePrefix="rect-select"
                            placeholder="Select..."
                            options={sbbjectOptions}
                            onChange={(e) => {
                              formik.setFieldValue("subject_id", e);
                            }}
                            value={formik.values.subject_id}
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Exam Board (if applicable)</label>
                        <div className="form-group">
                          <Select
                            type="text"
                            autoComplete="off"
                            name="exam_board_id"
                            id="exam_board_id"
                            className="rect-select-input"
                            classNamePrefix="rect-select"
                            placeholder="Select..."
                            options={examOptions}
                            onChange={(e) => {
                              formik.setFieldValue("exam_board_id", e);
                            }}
                            value={formik.values.exam_board_id}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-section-right">
                      <div className="row">
                        <div className="col-3">
                          <div className="input-group">
                            <label>No of sessions</label>
                            <div className="form-group">
                              <input
                                type="number"
                                autoComplete="off"
                                name="no_of_sessions"
                                id="no_of_sessions"
                                onChange={formik.handleChange}
                                value={formik.values.no_of_sessions}
                                onBlur={() => {
                                  formik.setFieldTouched("no_of_sessions");
                                }}
                              />
                              {formik.errors.no_of_sessions &&
                                formik.touched.no_of_sessions && (
                                  <span className="error-mes">
                                    {formik.errors.no_of_sessions}
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="input-group">
                            <label>Frequency</label>
                            <div className="form-group">
                              <Select
                                type="text"
                                autoComplete="off"
                                name="frequency_id"
                                id="frequency_id"
                                className="rect-select-input"
                                classNamePrefix="rect-select"
                                placeholder="Select..."
                                options={frequencyOptions}
                                onChange={(e) => {
                                  formik.setFieldValue("frequency_id", e);
                                }}
                                value={formik.values.frequency_id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-group">
                        <label>My hourly budget per subject </label>
                        <div className="budget-input">
                          <div className="budget-icon">
                            <img src={BudgetIcon} alt="BudgetIcon" />
                          </div>
                          <div className="form-group">
                            <input
                              type="number"
                              autoComplete="off"
                              name="hourly_budget"
                              id="hourly_budget"
                              onChange={formik.handleChange}
                              value={formik.values.hourly_budget}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add">
                    <span>Add</span>
                    <div className="img-wrap">
                      <img src={AddIcon} alt="add-icon" />
                    </div>
                  </div>
                </div>
                {/* BUTTON WRAP START  */}
                <div className="submit-button submit-container ">
                  <button disabled={loading} type="submit" value="Submit">
                    Update
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
                {/* BUTTON WRAP END  */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LearningPreference;
