import React from "react";
import { useField, useFormikContext } from "formik";
import { Form } from "react-bootstrap";

interface Props {
  name: string;
  type?: string;
  label: string;
}

const TextFieldWrapper = ({ name, type = "text", label }: Props) => {
  const [field, meta] = useField(name);

  // Configuring the input field
  const configTextField: any = {
    type,
    ...field,
    placeholder: `Enter ${label}`,
    style:
      meta && meta.touched && meta.error ? { border: "2px solid red" } : {},
  };

  if (meta && meta.touched && meta.error) {
    configTextField["aria-invalid"] = "true";
    configTextField["aria-describedby"] = "error-message";
  }

  return (
    <>
      <Form.Group className="mb-3" controlId={label}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...configTextField} />
        {meta && meta.touched && meta.error ? (
          <span id="error-message" style={{ color: "red" }}>
            {meta.error}
          </span>
        ) : null}
      </Form.Group>
    </>
  );
};

export default TextFieldWrapper;
