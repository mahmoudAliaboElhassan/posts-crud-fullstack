"use client"

import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { Formik, Form } from "formik"
import Swal from "sweetalert2"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from "react-icons/fa"

import TextFieldWrapper from "@/components/formUi/textField"
import ButtonWrapper from "@/components/formUi/submitButton"
import UseFormValidation from "@/hooks/use-form-validatio"
import UseInitialValues from "@/hooks/use-inital-values"
import axiosInstance from "@/utils/axiosInstance"

function SignUpForm() {
  const { INITIAL_FORM_STATE_SIGNUP } = UseInitialValues({})
  const { FORM_VALIDATION_SCHEMA_SIGNUP } = UseFormValidation()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <div className="flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-center gap-3">
              <FaUserPlus className="text-white text-2xl" />
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
            </div>
            <p className="text-blue-100 text-center mt-2">
              Join us today and get started
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE_SIGNUP }}
              validationSchema={FORM_VALIDATION_SCHEMA_SIGNUP}
              onSubmit={async (values) => {
                setLoading(true)
                const { confirmPassword, ...other } = values
                try {
                  await axiosInstance.post("/api/users/signup", other)
                  toast.success("Account created successfully!")
                  router.push("/login")
                } catch (error: any) {
                  Swal.fire({
                    title: "Sign Up Failed",
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
                  name="username"
                  label="Username"
                  type="text"
                  icon={<FaUser />}
                  placeholder="Choose a username"
                />

                <TextFieldWrapper
                  name="email"
                  label="Email"
                  type="email"
                  icon={<FaEnvelope />}
                  placeholder="Enter your email"
                />

                <TextFieldWrapper
                  name="password"
                  label="Password"
                  type="password"
                  icon={<FaLock />}
                  placeholder="Create a password"
                />

                <TextFieldWrapper
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  icon={<FaLock />}
                  placeholder="Confirm your password"
                />

                <ButtonWrapper loading={loading}>Sign Up</ButtonWrapper>

                {/* Login link */}
                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mt-6">
          By signing up, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm
