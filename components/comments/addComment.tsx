"use client"

import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { Form, Formik } from "formik"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { FaComment } from "react-icons/fa"

import ButtonWrapper from "@/components/formUi/submitButton"
import TextFieldWrapper from "@/components/formUi/textField"
import UseFormValidation from "@/hooks/use-form-validatio"
import UseInitialValues from "@/hooks/use-inital-values"
import axiosInstance from "@/utils/axiosInstance"

interface Props {
  postId: number
}

function AddCommentForm({ postId }: Props) {
  const { INITIAL_FORM_ADD_COMMENT } = UseInitialValues({})
  const { FORM_VALIDATION_ADD_COMMENT } = UseFormValidation()
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
              <FaComment className="text-white text-2xl" />
              <h2 className="text-2xl font-bold text-white">Add Comment</h2>
            </div>
            <p className="text-blue-100 text-center mt-2">
              Share your thoughts on this post
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Formik
              initialValues={{ ...INITIAL_FORM_ADD_COMMENT }}
              validationSchema={FORM_VALIDATION_ADD_COMMENT}
              onSubmit={async (values) => {
                setLoading(true)
                try {
                  await axiosInstance.post(`/api/comments`, {
                    text: values.text,
                    postId: postId,
                  })
                  toast.success("Comment added successfully!")
                  router.push(`/posts/${postId}`)
                } catch (error: any) {
                  if (error.status === 404) {
                    router.push(`/comments/add/${postId}/not-found`)
                  }
                  Swal.fire({
                    title: "Failed to Add Comment",
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
                  name="text"
                  label="Comment Text"
                  type="textarea"
                  icon={<FaComment />}
                  placeholder="Write your comment here..."
                />

                <ButtonWrapper loading={loading}>Add Comment</ButtonWrapper>
              </Form>
            </Formik>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mt-6">
          Be respectful and constructive in your comments
        </p>
      </div>
    </div>
  )
}

export default AddCommentForm
