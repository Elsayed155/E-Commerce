import React from "react";
import master from "../../Assets/images/master.png";
import paypal from "../../Assets/images/paypal.png";
import appstore from "../../Assets/images/appstore.png";
import google from "../../Assets/images/google.svg";
import amazon from "../../Assets/images/Amazon_Pay-Logo.wine.png";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <>
      <footer className="bg-main-light   py-5">
        <div className="container">
          <h4>Get the Frech Cart App</h4>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="d-flex">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Email..."
              />
            </div>
            <div className="col-sm-2 ps-3">
              <button className="btn w-100 main-btn text-white ">
                Share App Link
              </button>
            </div>
          </div>
          <div className="line border-bottom border-2 my-4"></div>

          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <p className="m-0">Payment Partners</p>
              <ul
                className="d-flex m-0 p-0 ms-2 align-items-center flex-wrap"
                style={{ listStyle: "none" }}
              >
                <li>
                  <img
                    src={amazon}
                    alt="amazon store"
                    style={{ width: "90px" }}
                    className="me-2"
                  />
                </li>
                <li>
                  <img src={master} alt="amazone" style={{ width: "80px" }} />
                </li>
                <li>
                  <img
                    src={paypal}
                    alt="american express"
                    style={{ width: "45px" }}
                  />
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center ">
              <p className="m-0">Get deliveries with FreshCart</p>
              <div className="d-flex align-items-center ms-2 flex-wrap ">
                <img
                  src={appstore}
                  alt="app store"
                  style={{ width: "90px" }}
                  className="me-2"
                />
                <img src={google} alt="google play" style={{ width: "90px" }} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
