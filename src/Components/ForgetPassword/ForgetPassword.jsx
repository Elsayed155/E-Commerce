import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
function ForgetPassword() {
  const [isloding, setIsloding] = useState(false);
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(value) {
    setIsloding(true);
    setErrorMessage("");
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords/`,
        value
      );
      navigate("/resetpassword");
      setIsloding(false);

      formik.resetForm({ values: "" });

      // window.open(data.session.url,"_self");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsloding(false);
    }
  }

  let validationScheme = yup.object({
    email: yup.string().email("Invalid Email!").required("Email is Required !"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit,
    validationSchema: validationScheme,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container my-5 py-5 ">
        <h2 className=" text-center text-main"> Forget Password </h2>
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="m-1">
            email :
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.email}
            </div>
          ) : null}

          {errorMessage && (
            <div className=" alert alert-danger ">{errorMessage}</div>
          )}
          <button
            disabled={!(formik.isValid && formik.dirty) || isloding}
            type="submit"
            className="btn btn-outline-success my-3 "
          >
            {isloding ? (
              <i className="fa fa-spin fa-spinner py-1 px-4  "></i>
            ) : (
              "send"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
