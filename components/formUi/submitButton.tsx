import React from "react";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const ButtonWrapper = ({ children, loading }: Props) => {
  const { submitForm } = useFormikContext();

  // Change the event type to React.MouseEvent<HTMLButtonElement>
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitForm();
  };

  // Change the type to React.ButtonHTMLAttributes<HTMLButtonElement>
  const configButton: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    disabled: loading,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{loading ? "loading..." : children}</Button>;
};

export default ButtonWrapper;
