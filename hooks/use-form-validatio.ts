import * as Yup from "yup";
import { ref } from "yup";

function UseFormValidation() {
  const FORM_VALIDATION_SCHEMA_LOGIN = Yup.object().shape({
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
  const FORM_VALIDATION_ADD_POST = Yup.object().shape({
    title: Yup.string()
      .required("title for the post is required")
      .min(2, "Minimum number of chars for the title is 2")
      .max(100, "Maximum number of chars for the title is 100"),
    description: Yup.string()
      .required("description for the post is required")
      .min(2, "Minimum number of chars for the decription is 2")
      .max(200, "Maximum number of chars for the decription is 200"),
  });
  const FORM_VALIDATION_ADD_COMMENT = Yup.object().shape({
    text: Yup.string()
      .required("text for the comment is required")
      .min(2, "Minimum number of chars is 2")
      .max(100, "Maximum number of chars is 100"),
  });
  const FORM_VALIDATION_UPDATE_POST = Yup.object().shape({
    title: Yup.string()
      .required("title for the post is required")
      .min(2, "Minimum number of chars for the title is 2")
      .max(100, "Maximum number of chars for the title is 100"),
    description: Yup.string()
      .required("description for the post is required")
      .min(2, "Minimum number of chars for the decription is 2")
      .max(200, "Maximum number of chars for the decription is 200"),
  });
  const FORM_VALIDATION_UPDATE_COMMENT = Yup.object().shape({
    text: Yup.string()
      .required("text for the comment is required")
      .min(2, "Minimum number of chars is 2")
      .max(100, "Maximum number of chars is 100"),
  });

  return {
    FORM_VALIDATION_SCHEMA_LOGIN,
    FORM_VALIDATION_SCHEMA_SIGNUP,
    FORM_VALIDATION_ADD_POST,
    FORM_VALIDATION_ADD_COMMENT,
    FORM_VALIDATION_UPDATE_POST,
    FORM_VALIDATION_UPDATE_COMMENT,
  };
}

export default UseFormValidation;
