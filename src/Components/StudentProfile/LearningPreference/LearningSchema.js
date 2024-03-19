import * as yup from "yup";

const LearningSchema = yup.object().shape({
  student_type_id: yup.object().required("Looking Field is Required "),
  no_of_sessions: yup.string().required("Sessions Field is Required "),
});

export default LearningSchema;
