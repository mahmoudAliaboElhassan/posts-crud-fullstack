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
import { Container } from "react-bootstrap";
import styles from "../form.module.css";

function AddPostForm() {
  const { INITIAL_FORM_ADD_POST } = UseInitialValues({});
  const { FORM_VALIDATION_ADD_POST } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_ADD_POST,
      }}
      validationSchema={FORM_VALIDATION_ADD_POST}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const user = await axiosInstance.post("/api/posts", values);
          toast.success("Post has been Added Successfully!");
          console.log(user.data);
          router.push("/");
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          Swal.fire({
            title: "Error in Adding Post",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      }}
    >
      <Container className={styles.formWrapper}>
        <Form>
          <TextFieldWrapper name="title" label="Title" />
          <TextFieldWrapper name="description" label="description" />
          <ButtonWrapper loading={Loading}>Add Post</ButtonWrapper>
        </Form>
      </Container>
    </Formik>
  );
}

export default AddPostForm;
