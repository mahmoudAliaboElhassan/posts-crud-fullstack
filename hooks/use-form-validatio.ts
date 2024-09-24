import * as Yup from "yup";
import { ref } from "yup";

function UseFormValidation() {
  const FORM_VALIDATION_SCHEMA_Login = Yup.object().shape({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // At least 2 characters after the last dot
        "Email should have at least two characters after the last dot"
      ),

    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
  });

  const FORM_VALIDATION_SCHEMA_SIGNUP = Yup.object().shape({
    username: Yup.string()
      .required("User Name Field is Required")
      .min(2, "Minimum number of characters is 2"),

    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email Field is Required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // At least 2 characters after the last dot
        "Email should have at least two characters after the last dot"
      ),

    password: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6"),
    confirmPassword: Yup.string()
      .required("Password Field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number"
      )
      .min(6, "Minimum Number of Chars is 6")
      .oneOf([ref("password")], "Password does not match"),
  });

  return { FORM_VALIDATION_SCHEMA_Login, FORM_VALIDATION_SCHEMA_SIGNUP };
}

export default UseFormValidation;
