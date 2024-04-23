import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { Helmet } from "react-helmet";
function ResetPassword() {
  const [isloding, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(value) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode/`,
        value
      );
      navigate("/newpassword");
      setIsLoading(false);

      Formik.resetForm({ values: "" });

      // window.open(data.session.url,"_self");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  }

  let validationScheme = yup.object({
    resetCode: yup.number().required("code is Required !"),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit,
    validationSchema: validationScheme,
  });
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="container my-5 py-5 ">
        <h2 className=" text-center text-main">Reset Code </h2>
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="m-1">
            resetCode :
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            className="form-control"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className=" alert alert-danger m-2 p-2">
              {formik.errors.resetCode}
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

export default ResetPassword;
