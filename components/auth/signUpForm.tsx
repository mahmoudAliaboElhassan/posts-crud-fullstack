"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";

import ButtonWrapper from "@/components/formUi/submitButton";
import TextFieldWrapper from "@/components/formUi/textField";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

function LoginForm() {
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE_SIGNUP,
      }}
      validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
      onSubmit={async (values) => {
        setLoading(true);
        const { confirmPassword, ...other } = values;
        try {
          const user = await axiosInstance.post("/api/users/signup", other);
          toast.success("You Have Created Account Successfully!");
          console.log(user.data);
          router.push("/login");
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
      <Form>
        <TextFieldWrapper name="username" label="User Name" />
        <TextFieldWrapper name="email" label="Email" />
        <TextFieldWrapper name="password" label="Password" />
        <TextFieldWrapper name="confirmPassword" label="Confirm Password" />
        <ButtonWrapper loading={Loading}>SignUp</ButtonWrapper>
      </Form>
    </Formik>
  );
}

export default LoginForm;
