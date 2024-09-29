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
import Link from "next/link";

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
          router.refresh();
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
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Container fluid="md" className={styles.formWrapper}>
          <h2
            className="text-center mb-4"
            style={{ textShadow: "0px 2px 9px rgb(151 26 26 / 50%)" }}
          >
            Login to Your Account
          </h2>{" "}
          {/* Heading added */}
          <Form>
            <TextFieldWrapper name="email" label="Email" />
            <TextFieldWrapper name="password" label="Password" />
            <ButtonWrapper loading={Loading}>login</ButtonWrapper>
            <div className="text-center text-lg-start mt-1 mt-lg-0">
              Do not have an Account{" "}
              <Link
                href="/signup"
                title="Create Account"
                style={{ borderBottom: "1px solid white" }}
              >
                SignUp
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </Formik>
  );
}

export default LoginForm;
