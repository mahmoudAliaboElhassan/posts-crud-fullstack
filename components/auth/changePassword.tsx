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
import { verifyTokenForPage } from "@/utils/verifyToken";
import { JWTPayload } from "@/utils/types";
import { Container } from "react-bootstrap";
import styles from "../form.module.css";
import Link from "next/link";

interface Props {
  jwtPayload: JWTPayload;
}

function ChangePasswordForm({ jwtPayload }: Props) {
  const { INITIAL_FORM_CHANGE_PASSWORD } = UseInitialValues({});
  const { FORM_VALIDATION_CHANGE_PASSWORD } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  console.log("jwtPayload", jwtPayload);
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_CHANGE_PASSWORD,
      }}
      validationSchema={FORM_VALIDATION_CHANGE_PASSWORD}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const user = await axiosInstance.put(
            `/api/users/password/${jwtPayload?.id}`,
            values
          );
          toast.success("Password has Been Changed Successfully!");
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
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Container className={styles.formWrapper}>
          <h2
            className="text-center mb-4"
            style={{ textShadow: "0px 2px 9px rgb(151 26 26 / 50%)" }}
          >
            Change Your Password Now
          </h2>{" "}
          <Form>
            <TextFieldWrapper name="currentPassword" label="Current Password" />
            <TextFieldWrapper name="newPassword" label="New Password" />
            <ButtonWrapper loading={Loading}>Chage Password</ButtonWrapper>{" "}
            <div className="text-center text-lg-start mt-1 mt-lg-0">
              Remembered it{" "}
              <Link
                href="/login"
                title="Login to your Account"
                style={{ borderBottom: "1px solid white", marginTop: "8px" }}
              >
                Login
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </Formik>
  );
}

export default ChangePasswordForm;

// cookies is in server
// but to make it in client it needs external library js-cookie
