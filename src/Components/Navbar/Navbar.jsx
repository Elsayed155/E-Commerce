import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { FaFacebook } from "react-icons/fa";

import logo from "../../Assets/images/logo.svg";
import { TokenContext } from "../../Context/Token";
import { CartContent } from "../../Context/CartContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Navbar() {
  let { token, setToken } = useContext(TokenContext);
  let { numberOfCartItem } = useContext(CartContent);
  let nevagite = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    nevagite("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"products"}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"categories"}
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to={"brands"}>
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"favouriteitem"}
                  >
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link " aria-current="page" to={"cart"}>
                    Cart
                    <span className="bg-main text-white m-1 px-1 rounded position-absolute top-0 ">
                      {numberOfCartItem}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center">
                <FaInstagram className="mx-1" />
                <FaFacebook className="mx-1" />
                <FaLinkedin className="mx-1" />
              </li>

              {token ? (
                <li className="nav-item">
                  <button className="nav-link " onClick={logOut}>
                    logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
