"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../modal.css";
import { Post } from "@prisma/client";
import { Form, Formik } from "formik";
import ButtonWrapper from "../formUi/submitButton";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import TextFieldWrapper from "../formUi/textField";
import { useRouter } from "next/navigation";

interface Props {
  show: boolean;
  handleClose: () => void;
  postData?: Post;
}

function ModalUpdatePost({ show, handleClose, postData }: Props) {
  console.log("postData", postData);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { FORM_VALIDATION_UPDATE_POST } = UseFormValidation();
  // const router = useRouter();
  const { INITIAL_FORM_UPDATE_POST } = UseInitialValues({
    title: postData?.title,
    description: postData?.description,
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Post Data</Modal.Title>
        </Modal.Header>
        {postData === undefined ? (
          <div>wait for post data to load</div>
        ) : (
          <Modal.Body>
            <Formik
              initialValues={{
                ...INITIAL_FORM_UPDATE_POST,
              }}
              validationSchema={FORM_VALIDATION_UPDATE_POST}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  const post = await axiosInstance.put(
                    `/api/posts/${postData?.id}`,
                    values
                  );
                  toast.success("Post is Updated Successfully!");
                  console.log(post.data);
                  setLoading(false);
                  router.refresh();
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
                <TextFieldWrapper name="title" label="Title" />
                <TextFieldWrapper name="description" label="Description" />
                <ButtonWrapper loading={loading}>Update Password</ButtonWrapper>
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

export default ModalUpdatePost;
