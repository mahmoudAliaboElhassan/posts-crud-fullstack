"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../modal.css";
import { Comment, Post } from "@prisma/client";
import { Form, Formik } from "formik";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import TextFieldWrapper from "../formUi/textField";
import ButtonWrapper from "../formUi/submitButton";

interface Props {
  show: boolean;
  handleClose: () => void;
  commentData?: Comment;
}

function ModalUpdateComment({ show, handleClose, commentData }: Props) {
  console.log("commentData", commentData);

  const [loading, setLoading] = useState<boolean>(false);
  const { FORM_VALIDATION_UPDATE_COMMENT } = UseFormValidation();
  // const router = useRouter();
  const { INITIAL_FORM_UPDATE_COMMENT } = UseInitialValues({
    text: commentData?.text,
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Post Data</Modal.Title>
        </Modal.Header>
        {commentData === undefined ? (
          <div>wait for post data to load</div>
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
                  toast.success("Comment is Updated Successfully!");
                  console.log(comment);
                  setLoading(false);
                  handleClose();
                } catch (error: any) {
                  handleClose();
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateComment;
