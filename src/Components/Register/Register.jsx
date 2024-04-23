import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaSpinner } from "react-icons/fa";

function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function callReg(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });

    if (data.message == "success") {
      navigate("/Login");
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(30, "name is too long")
      .required("Name is required"),
    email: Yup.string("email not valid")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "invalid email"
      )
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        "invalid password"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword shouid match")
      .required("password is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone is required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callReg,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto my-3">
        <h2 className="mb-3">Register</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-1">
              Name
            </label>
            <input
              type="text"
              onBlur={registerForm.handleBlur}
              name="name"
              id="fullName"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              className="form-control"
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger">
                {registerForm.errors.name}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              onBlur={registerForm.handleBlur}
              name="email"
              id="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              className="form-control"
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              onBlur={registerForm.handleBlur}
              name="password"
              id="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              className="form-control"
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-1">
              Repassword
            </label>
            <input
              type="password"
              onBlur={registerForm.handleBlur}
              name="rePassword"
              id="rePassword"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              className="form-control"
            />
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone" className="mb-1">
              Phone
            </label>
            <input
              type="tel"
              onBlur={registerForm.handleBlur}
              name="phone"
              id="phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              className="form-control"
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger">
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>
          <button
            className="btn bg-main text-white d-block "
            disabled={!(registerForm.isValid && registerForm.dirty)}
            type="submit"
            onSubmit={registerForm.handleSubmit}
          >
            {isLoading ? <FaSpinner /> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
