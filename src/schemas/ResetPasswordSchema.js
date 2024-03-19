import * as yup from "yup";

const ResetPasswordSchema = yup.object().shape({
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

export default ResetPasswordSchema;
