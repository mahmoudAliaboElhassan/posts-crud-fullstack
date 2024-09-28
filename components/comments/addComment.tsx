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
import { notFound, useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import styles from "../form.module.css";

interface Props {
  postId: number;
}

function AddCommentForm({ postId }: Props) {
  console.log("post postId from client", postId);

  const { INITIAL_FORM_ADD_COMMENT } = UseInitialValues({});
  const { FORM_VALIDATION_ADD_COMMENT } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_ADD_COMMENT,
      }}
      validationSchema={FORM_VALIDATION_ADD_COMMENT}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const user = await axiosInstance.post(`/api/comments`, {
            text: values.text,
            postId: postId,
          });
          toast.success("Comment has been added Successfully!");
          console.log(user.data);
          router.push("/posts");
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          console.log(error);
          if (error.status === 404) {
            router.push(`/comments/add/${postId}/not-found`);
          }
          Swal.fire({
            title: "Error in Adding Comment",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "ok",
          });
          // notFound();
          // for server component
        }
      }}
    >
      <Container className={styles.formWrapper}>
        <Form>
          <TextFieldWrapper name="text" label="Text" />
          <ButtonWrapper loading={Loading}>Add Comment</ButtonWrapper>
        </Form>
      </Container>
    </Formik>
  );
}

export default AddCommentForm;
