import * as yup from "yup";

const CreatePasswordSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      //REGEX OF EMAIL
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, Uppercase, Lowercase, Number and special case Character"
    )
    .required("Please Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please Enter your password"),
});

export default CreatePasswordSchema;
