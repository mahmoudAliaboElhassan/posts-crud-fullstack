"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Post } from "@prisma/client"
import { Form, Formik } from "formik"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { FaPenFancy, FaTimes, FaFileAlt } from "react-icons/fa"

import UseFormValidation from "@/hooks/use-form-validatio"
import UseInitialValues from "@/hooks/use-inital-values"
import axiosInstance from "@/utils/axiosInstance"
import TextFieldWrapper from "../formUi/textField"
import ButtonWrapper from "../formUi/submitButton"
import LoadingFetching from "../loadingData"

interface Props {
  show: boolean
  handleClose: () => void
  postData?: Post
  handleUpdate: () => void
}

function ModalUpdatePost({ show, handleClose, postData, handleUpdate }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { FORM_VALIDATION_UPDATE_POST } = UseFormValidation()
  const { INITIAL_FORM_UPDATE_POST } = UseInitialValues({
    title: postData?.title,
    description: postData?.description,
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [show])

  if (!show || !mounted) return null

  const modalContent = (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative z-[10000] flex items-center justify-center min-h-screen p-4">
        <div
          className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaPenFancy className="text-white text-xl" />
              <h2 className="text-xl font-bold text-white">Update Post</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-hidden max-h-[calc(90vh-180px)]">
            {postData === undefined ? (
              <div className="min-h-screen">
                <LoadingFetching>Wait for post data to load...</LoadingFetching>
              </div>
            ) : (
              <Formik
                initialValues={{ ...INITIAL_FORM_UPDATE_POST }}
                validationSchema={FORM_VALIDATION_UPDATE_POST}
                onSubmit={async (values) => {
                  setLoading(true)
                  try {
                    const post = await axiosInstance.put(
                      `/api/posts/${postData?.id}`,
                      values
                    )
                    toast.success("Post updated successfully!")
                    handleUpdate()
                    router.refresh()
                    handleClose()
                  } catch (error: any) {
                    Swal.fire({
                      title: "Update Failed",
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
                        if (cancelBtn)
                          cancelBtn.style.backgroundColor = "#6b7280" // gray-500 تقريباً
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
                    placeholder="Edit post title..."
                  />

                  <TextFieldWrapper
                    name="description"
                    label="Description"
                    type="textarea"
                    icon={<FaPenFancy />}
                    placeholder="Edit post description..."
                  />

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <ButtonWrapper loading={loading}>Update Post</ButtonWrapper>
                  </div>
                </Form>
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default React.memo(ModalUpdatePost)
