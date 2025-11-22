"use client"

import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { Form, Formik } from "formik"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { FaPenFancy, FaFileAlt } from "react-icons/fa"

import ButtonWrapper from "@/components/formUi/submitButton"
import TextFieldWrapper from "@/components/formUi/textField"
import UseFormValidation from "@/hooks/use-form-validatio"
import UseInitialValues from "@/hooks/use-inital-values"
import axiosInstance from "@/utils/axiosInstance"

function AddPostForm() {
  const { INITIAL_FORM_ADD_POST } = UseInitialValues({})
  const { FORM_VALIDATION_ADD_POST } = UseFormValidation()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <div className="flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-center gap-3">
              <FaPenFancy className="text-white text-2xl" />
              <h2 className="text-2xl font-bold text-white">Create New Post</h2>
            </div>
            <p className="text-blue-100 text-center mt-2">
              Share your thoughts with the community
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Formik
              initialValues={{ ...INITIAL_FORM_ADD_POST }}
              validationSchema={FORM_VALIDATION_ADD_POST}
              onSubmit={async (values) => {
                setLoading(true)
                try {
                  await axiosInstance.post("/api/posts", values)
                  toast.success("Post created successfully!")
                  router.push("/posts?pageNumber=1")
                } catch (error: any) {
                  Swal.fire({
                    title: "Failed to Create Post",
                    text:
                      error.response?.data?.message || "Something went wrong",
                    icon: "error",
                    confirmButtonText: "Try Again",
                    customClass: {
                      confirmButton:
                        "px-4 py-2 font-medium rounded-md text-white",
                      cancelButton:
                        "px-4 py-2 font-medium rounded-md text-white",
                      actions: "gap-4",
                    },

                    buttonsStyling: false,

                    didRender: () => {
                      const confirmBtn = Swal.getConfirmButton()
                      const cancelBtn = Swal.getCancelButton()

                      // إضافة الخلفيات المطلوبة
                      if (confirmBtn)
                        confirmBtn.style.backgroundColor = "#e14d4d"
                      if (cancelBtn) cancelBtn.style.backgroundColor = "#6b7280" // gray-500 تقريباً
                    },
                  })
                } finally {
                  setLoading(false)
                }
              }}
            >
              <Form className="space-y-5">
                <TextFieldWrapper
                  name="title"
                  label="Title"
                  type="text"
                  icon={<FaFileAlt />}
                  placeholder="Enter post title"
                />

                <TextFieldWrapper
                  name="description"
                  label="Description"
                  type="textarea"
                  icon={<FaPenFancy />}
                  placeholder="Write your post content..."
                />

                <ButtonWrapper loading={loading}>Create Post</ButtonWrapper>
              </Form>
            </Formik>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mt-6">
          Make sure your post follows our community guidelines
        </p>
      </div>
    </div>
  )
}

export default AddPostForm
