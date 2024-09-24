import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  type?: string; // Make type optional with `?`
  label: string;
}

const TextFieldWrapper = ({ name, type, label }: Props) => {
  const [field, meta] = useField(name); // Corrected 'mata' to 'meta'

  const configTextField: React.InputHTMLAttributes<HTMLInputElement> = {
    type: type || "text",
    ...field,
    id: label,
    style:
      meta && meta.touched && meta.error ? { border: "2px solid red" } : {}, // Apply red border if there's an error
  };

  if (meta && meta.touched && meta.error) {
    configTextField["aria-invalid"] = "true"; // Mark input as invalid for accessibility
    configTextField["aria-describedby"] = "error-message";
  }

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input {...configTextField} />
      {meta && meta.touched && meta.error ? (
        <span id="error-message" style={{ color: "red" }}>
          {meta.error}
        </span>
      ) : null}
    </>
  );
};

export default TextFieldWrapper;
