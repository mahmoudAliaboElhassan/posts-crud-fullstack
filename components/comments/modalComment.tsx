"use client"; // Ensure this is present

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../modal.css";
import { Comment } from "@prisma/client";
import { Form, Formik } from "formik";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import TextFieldWrapper from "../formUi/textField";
import ButtonWrapper from "../formUi/submitButton";
import { useRouter } from "next/navigation"; // Correct hook for app directory
import LoadingFetching from "../loadingData";

interface Props {
  show: boolean;
  handleClose: () => void;
  commentData?: Comment;
}

function ModalUpdateComment({ show, handleClose, commentData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { FORM_VALIDATION_UPDATE_COMMENT } = UseFormValidation();
  const { INITIAL_FORM_UPDATE_COMMENT } = UseInitialValues({
    text: commentData?.text,
  });

  return (
    <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
      <Modal.Header closeButton>
        <Modal.Title>Change Post Data</Modal.Title>
      </Modal.Header>
      {commentData === undefined && show ? (
        <LoadingFetching>Wait Comment Data to Load ...</LoadingFetching>
      ) : (
        <Modal.Body>
          <Formik
            initialValues={{
              ...INITIAL_FORM_UPDATE_COMMENT,
            }}
            validationSchema={FORM_VALIDATION_UPDATE_COMMENT}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const comment = await axiosInstance.put(
                  `/api/comments/${commentData?.id}`,
                  values
                );
                // Trigger the router to refresh the page
                router.refresh();
                toast.success("Comment is Updated Successfully!");
                setLoading(false);
                handleClose();
              } catch (error: any) {
                setLoading(false);
                Swal.fire({
                  title: "Error in Logging",
                  text: error.response.data.message,
                  icon: "error",
                  confirmButtonText: "ok",
                });
                handleClose();
              }
            }}
          >
            <Form>
              <TextFieldWrapper name="text" label="Title" />
              <ButtonWrapper loading={loading}>Update comment</ButtonWrapper>
            </Form>
          </Formik>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateComment;

// router.push('/dashboard', { scroll: false })}
