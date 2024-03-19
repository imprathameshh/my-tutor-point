import * as yup from "yup";

// SCHEMAS START
const ForgotPasswordSchemas = yup.object().shape({
  email: yup
    .string()
    .matches(
      //REGEX OF EMAIL
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
});
// SCHEMAS END

export default ForgotPasswordSchemas;
