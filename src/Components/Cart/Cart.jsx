import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContent } from "../../Context/CartContent";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
function Cart() {
  const [cartDetails, setCartDetails] = useState({});
  let { getCart, deleteProductCart, updateProductQuantity, setNumOfCartItem } =
    useContext(CartContent);
  async function removeItem(id) {
    let { data } = await deleteProductCart(id);
    setNumOfCartItem(data.numOfCartItems);

    setCartDetails(data);
  }
  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);

    data.data.products.map((ele) => {
      if (ele.count == 0) {
        removeItem(ele.product._id);
      }
    });

    setCartDetails(data);
  }
  async function getCartDetails() {
    let { data } = await getCart();
    setNumOfCartItem(data.numOfCartItems);
    setCartDetails(data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails.data ? (
        <div className="container my-5">
          <div className="w-75 mx-auto bg-main-light p-5">
            {cartDetails.data.products.length >= 1 ? (
              <div>
                <h1 className="mb-4">Cart Shop</h1>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5">
                    Total Price :{" "}
                    <span className="text-main">
                      {cartDetails.data.totalCartPrice}
                    </span>
                  </h3>
                  <h3 className="h5">
                    Total Numbers :{" "}
                    <span className="text-main">
                      {cartDetails.numOfCartItems}
                    </span>
                  </h3>
                </div>

                {cartDetails.data.products.map((ele) => (
                  <div key={ele.product._id} className="row py-2 border-bottom">
                    <div className="col-md-1">
                      <img
                        src={ele.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-11">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="left-side">
                          <h4>{ele.product.title}</h4>
                          <p>{ele.price} EGP</p>
                        </div>
                        <div className="right-side">
                          <button
                            className="btn main-btn"
                            onClick={() =>
                              updateCount(ele.product._id, ele.count - 1)
                            }
                          >
                            -
                          </button>
                          <span className="mx-2">{ele.count}</span>
                          <button
                            className="btn main-btn"
                            onClick={() =>
                              updateCount(ele.product._id, ele.count + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="btn text-danger p-0"
                        onClick={() => removeItem(ele.product._id)}
                      >
                        <i className="fa fa-trash-can"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
                <Link
                  to={"/checkout"}
                  className="btn bg-main w-100 text-white mt-5"
                >
                  checkout
                </Link>
              </div>
            ) : (
              <div className=" alert alert-success d-flex justify-content-center align-items-center my-5 py-5 ">
                <h3> your Cart List Is Empty </h3>
              </div>
            )}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Cart;
