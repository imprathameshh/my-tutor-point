import { type } from "@testing-library/user-event/dist/type";
import * as yup from "yup";

const PersonalSchema = yup.object().shape({
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
  dob: yup.date().nullable().required("Date of Birth is required"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Invalid gender"),
  // File validation
  // file: yup
  //   .mixed()
  //   .test(
  //     "FILE_SIZE",
  //     "Uploaded file is too big.",
  //     (value) => !value || (value && value.size <= 5 * 1024 * 1024)
  //   )
  //   .test("FILE_FORMAT", "Uploaded file has unsupported format.", (value) => {
  //     console.log({ value });
  //     return (
  //       !value || (value && ["image/jpeg", "image/png"].includes(value.type))
  //     );
  //   })
  //   .required("File is required"),
});

export default PersonalSchema;
//
//
