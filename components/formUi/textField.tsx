import React from "react";
import { useField, useFormikContext } from "formik";
import { Form } from "react-bootstrap";

interface Props {
  name: string;
  type?: string;
  label: string;
}

const TextFieldWrapper = ({ name, type, label }: Props) => {
  const [field, meta] = useField(name);
  const formik = useFormikContext();

  // Configuring the input field
  const configTextField: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "text",
    ...field, // Spread the field to include value, onChange, onBlur
    id: label,
    style:
      meta && meta.touched && meta.error ? { border: "2px solid red" } : {},
  };

  // Handling error state for accessibility
  if (meta && meta.touched && meta.error) {
    configTextField["aria-invalid"] = "true";
    configTextField["aria-describedby"] = "error-message";
  }

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <Form.Control {...configTextField} />
      {meta && meta.touched && meta.error ? (
        <span id="error-message" style={{ color: "red" }}>
          {meta.error}
        </span>
      ) : null}
    </>
  );
};

export default TextFieldWrapper;
