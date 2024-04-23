import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setToken } = useContext(TokenContext);
  async function callLog(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });

    if (data.message == "success") {
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/");
    }
  }
  const validationSchema = Yup.object({
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
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLog,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto my-3">
        <h2 className="mb-3">Login</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              onBlur={loginForm.handleBlur}
              name="email"
              id="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              className="form-control"
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="alert alert-danger">{loginForm.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              onBlur={loginForm.handleBlur}
              name="password"
              id="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              className="form-control"
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="alert alert-danger">
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"/forgetpassword"}>Forget Your Password</Link>
            <Link to={"/register"}>Register</Link>
          </div>

          <button
            className="btn bg-main text-white d-block mt-5"
            type="submit"
            onSubmit={loginForm.handleSubmit}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
