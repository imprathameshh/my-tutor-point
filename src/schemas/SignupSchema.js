import * as yup from "yup";

const SignupSchema = yup.object().shape({
  firstname: yup
    .string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastname: yup
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  email: yup
    .string()
    .matches(
      //REGEX OF EMAIL
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
  selectbox: yup.object().required("Required Field "),
});

export default SignupSchema;
