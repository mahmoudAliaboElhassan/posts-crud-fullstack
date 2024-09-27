"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";

import ButtonWrapper from "@/components/formUi/submitButton";
import TextFieldWrapper from "@/components/formUi/textField";
import UseFormValidation from "@/hooks/use-form-validatio";
import UseInitialValues from "@/hooks/use-inital-values";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

function UpdatePost({ params }: Props) {
  const [postData, setPostData] = useState<Post>();
  const { INITIAL_FORM_UPDATE_POST } = UseInitialValues({
    title: postData?.title,
    description: postData?.description,
  });
  console.log(INITIAL_FORM_UPDATE_POST);
  const { FORM_VALIDATION_UPDATE_POST } = UseFormValidation();
  const [Loading, setLoading] = useState<boolean>(false);
  const [loadingPostData, setLoadingPostData] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getPostData = async () => {
      setLoadingPostData(true);
      try {
        const post = await axiosInstance.get(`/api/posts/${params.id}`);
        console.log(post);
        setPostData(post.data);
        console.log(postData);
        setLoadingPostData(false);
      } catch (error) {
        setLoadingPostData(false);
      }
    };
    getPostData();
  }, []);

  return (
    <div>
      {loadingPostData ? (
        <div>wait for post data to load</div>
      ) : (
        <Formik
          initialValues={{
            ...INITIAL_FORM_UPDATE_POST,
          }}
          validationSchema={FORM_VALIDATION_UPDATE_POST}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const user = await axiosInstance.put(
                `/api/posts/${params.id}`,
                values
              );
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
          <Form>
            <TextFieldWrapper name="title" label="Title" />
            <TextFieldWrapper name="description" label="description" />
            <ButtonWrapper loading={Loading}>Add Post</ButtonWrapper>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default UpdatePost;
