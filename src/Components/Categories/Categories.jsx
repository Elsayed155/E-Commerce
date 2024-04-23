import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
function Categories() {
  const [isHidden, setIsHidden] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { isLoading, data } = useQuery("AllCategories", getAllCategories);
  const [openModal, setOpenModal] = useState(false);

  const [details, setdetails] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  let prame = useParams();
  async function getSpecificCategoriey(id) {
    setIsLoding(true);
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    setOpenModal(true);

    setdetails(response.data.data);
    setIsLoding(false);
  }
  console.log(setdetails);

  //   const [selectedCategory, setSelectCategory] = useState([]);
  //   async function getCategoryDetails(id) {
  //     let { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  //     );
  //     setSelectCategory(data.data);
  //   }
  //   console.log(setSelectCategory);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container py-5">
        {isLoading ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
            visible={true}
          />
        ) : (
          <div className="row">
            {data?.data?.data.map((ele) => (
              <div key={ele._id} className="col-md-4  ">
                <div
                  className="card my-3 text-center"
                  onClick={() => {
                    toggleVisibility();
                    getSpecificCategoriey(ele._id);
                  }}
                >
                  <img
                    src={ele.image}
                    alt={ele.slig}
                    height={400}
                    className="w-100"
                  />
                  <div className="card-body">
                    <h5>{ele.name}</h5>
                  </div>
                </div>

                <div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {details.map((ele) => (
        <div className="sub-categories text-center ">
          <h2 className="text-main">Men's Fashion subcategories</h2>
          <div className="container">
            <div className="col-md-3">
              <div
                className="card my-3 text-center"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="card-body">
                  <h5>{ele.category}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isHidden ? null : (
        <div className="sub-categories text-center d-none">
          <h2 className="text-main">Men's Fashion subcategories</h2>
          <div className="container">
            <div className="col-md-3">
              <div
                className="card my-3 text-center"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="card-body">
                  <h5>Eelctronic</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {isHidden ? null : (
        <div className="container my-3">
          <div className="row g-5">
            {details.map((ele) => (
              <div
                key={ele._id}
                className=" col-md-4 rounded-2 p-4 product  border  cursor-pointer "
              >
                <h4 className=" text-success text-center">{ele.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-around align-items-center">
          {details.map((ele) => (
            <div
              key={ele._id}
              className=" col-md-4 rounded-2 p-5 product my-5 border mx-1 cursor-pointer "
            >
              <h4 className=" text-success text-center">{ele.name}</h4>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default Categories;
