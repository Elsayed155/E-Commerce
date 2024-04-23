import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
// import { Modal } from "bootstrap";
function Brands() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { isLoading, data } = useQuery("brands", getAllBrands);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  async function getBrandsDetails(id) {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    setOpenModal(true);
    setSelectedBrand(response.data.data);
  }
  // console.log(selectedBrand, openModal);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="container py-5">
        <h2 className="text-main text-center font-weight-bold h1">
          All Brands
        </h2>
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
              <div key={ele._id} className="col-md-3">
                {/* onClick={() => getBrandsDetails(ele.id)} */}
                <div
                  className="card my-3 text-center"
                  //   data-bs-toggle="modal"
                  //   data-bs-target={`#exampleModal`}
                  //   data-bs-backdrop="static"
                  //   role="button"
                  onClick={() => {
                    handleShow();
                    getBrandsDetails(ele._id);
                  }}
                >
                  <img src={ele.image} alt={ele.slig} className="w-100" />
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

      {/* {data?.data?.data.map((selectedBrand) => ( */}
      {/* {selectedBrand ? (
        // openModal ? (
        <div
          className="modal fade"
          id={`exampleModal`}
          //   tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  //   onClick={() => setSelectedBrand(null)}
                />
              </div>
              <div className="modal-body d-flex justify-content-around align-items-center">
                <div>
                  <h2 className="text-main">{selectedBrand.name}</h2>
                  <p>{selectedBrand.slug}</p>
                </div>
                <div>
                  <h2 className="h1">{selectedBrand.name}</h2>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  //   onClick={() => setSelectedBrand(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : // ) : null
      null} */}
      {/* ))} */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-around align-items-center">
          <div>
            <h2 className="text-main">{selectedBrand.name}</h2>
            <p>{selectedBrand.slug}</p>
          </div>
          <div>
            <h2 className="h1">{selectedBrand.name}</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Brands;
