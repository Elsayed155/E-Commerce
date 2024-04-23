import React, { useContext, useState } from "react";
import styles from "./NewPassword.module.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
function NewPassword() {
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const [isloding, setIsLoading] = useState(false);

  const [errorrMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  let validationScheme = yup.object({
    email: yup.string().email("Invalid Email!").required("Email is Required !"),
    newPassword: yup
      .string()
      .required("Password is Required !")
      .matches(
        regexPassword,
        "Invalid Password! Enter password starts with a capital letter,includes numbers,symbols & minimum 8 chars !"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationScheme,
    onSubmit: async () => {
      setErrorMessage("");

      try {
        setIsLoading(true);
        let { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          formik.values
        );
        if (data) {
          localStorage.setItem("token", data.token);
          if (window.location.pathname === "/setnewpassword") {
            navigate("/");
          } else {
            navigate(window.location.pathname);
          }
        }

        formik.resetForm({ values: "" });
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }

      setIsLoading(false);
    },
  });
  return (
    <>
      <div className=" container    ">
        <h2 className="text-center text-success m-4 h1 "> Set New Password</h2>

        <form onSubmit={formik.handleSubmit} className=" m-5 ">
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="email" className="m-1">
              Email :
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="form-control "
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" alert alert-danger m-2 p-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="col-md-8 my-2 mx-auto  ">
            <label htmlFor="newPassword" className="m-1">
              newPassword :
            </label>
            <input
              type="Password"
              name="newPassword"
              id="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="form-control"
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className=" alert alert-danger p-2 m-2 ">
                {" "}
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="col-md-8 my-2 mx-auto  ">
            {errorrMessage ? (
              <div className=" alert alert-danger p-2 m-2">
                {" "}
                {errorrMessage}
              </div>
            ) : null}

            <div className=" d-flex justify-content-between align-items-center ">
              <button
                disabled={!(formik.isValid && formik.dirty) || isloding}
                type="submit"
                className="btn btn-outline-success my-3 text-black fs-5  "
              >
                {isloding ? (
                  <i className="fa fa-spin fa-spinner py-1 px-4  "></i>
                ) : (
                  "send"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPassword;
