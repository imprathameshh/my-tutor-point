import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      //REGEX OF EMAIL
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: yup.string().required("Please Enter your password"),
});
export default LoginSchema;
