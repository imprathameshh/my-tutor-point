import * as yup from "yup";

const PreferenceSchema = yup.object().shape({
  looking_to_be_tutored_by: yup.object().required("Looking Field is Required "),
  preferred_languages: yup.object().required("Language Field is Required "),
  want_my_tutor_to_teaches: yup
    .object()
    .required("Tutor Tech Field is Required "),
});

export default PreferenceSchema;
