"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import Swal from "sweetalert2";

import ButtonWrapper from "@/components/formUi/submitButton";
import TextFieldWrapper from "@/components/formUi/textField";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Container, Form } from "react-bootstrap";
import styles from "../form.module.css";

function LoginForm() {
  const { INITIAL_FORM_STATE_LOGIN } = UseInitialValues({});
  const { FORM_VALIDATION_SCHEMA_LOGIN } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE_LOGIN,
      }}
      validationSchema={FORM_VALIDATION_SCHEMA_LOGIN}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const user = await axiosInstance.post("/api/users/login", values);
          toast.success("You Have Logged In Successfully!");
          console.log(user.data);
          router.push("/");
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          Swal.fire({
            title: "Error in Logging",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      }}
    >
      <Container fluid="md" className={styles.formWrapper}>
        <Form>
          <TextFieldWrapper name="email" label="Email" />
          <TextFieldWrapper name="password" label="Password" />
          <ButtonWrapper loading={Loading}>login</ButtonWrapper>
        </Form>
      </Container>
    </Formik>
  );
}

export default LoginForm;
