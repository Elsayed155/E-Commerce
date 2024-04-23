import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContent } from "../../Context/CartContent";
import { Helmet } from "react-helmet";
function Details() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [wishProduct, setWishProduct] = useState([]);

  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function addWishlist(id) {
    let response = await addTowishlist(id);
    if (response.data.status == "success") {
      setDetails(details._id === id ? { ...details, isWish: true } : details);
      console.log(response.data);
      toast.success("Product added successfully");
    } else {
      toast.error("Failed To Add Product");
    }
  }
  async function removeWishlist(id) {
    let response = await deletewishProdct(id);
    if (response.data.status == "success") {
      setDetails(details._id === id ? { ...details, isWish: false } : details);
      toast.success("Product removed successfully");
    } else {
      toast.error("Failed To Add Product");
    }
  }
  let x = useParams();
  async function getProductDetails(id) {
    if (wishProduct) {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );

      // console.log(data);
      setDetails({ ...data.data, isWish: wishProduct?.includes(id) });
      setIsLoading(false);
    }
  }
  console.log(details);
  useEffect(() => {
    // getProductDetails(x.id);
    (async () => {
      if (wishProduct) {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
        );

        // console.log(data);
        setDetails({ ...data.data, isWish: wishProduct?.includes(x.id) });
        setIsLoading(false);
      }
    })();
  }, [wishProduct, x.id]);

  let {
    addToCart,
    setNumOfCartItem,
    addTowishlist,
    deletewishProdct,
    getUserWishlist,
  } = useContext(CartContent);
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == "success") {
      toast.success("Product added successfully");
      setNumOfCartItem(res.data.numOfCartItems);
    } else {
      toast.error("Failed To Add Product");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const [respon] = await Promise.all([getUserWishlist()]);
      setWishProduct(respon.data.data.map((item) => item._id));
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="container my-5">
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
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((ele, index) => (
                  <img src={ele} alt="" key={index} />
                ))}
              </Slider>
            </div>

            <div className="col-md-8">
              <h2>{details.title}</h2>
              <p>{details.description}</p>
              <p>{details.category.name}</p>
              {details.isWish ? (
                <FaHeart
                  className="mx-2"
                  onClick={() => removeWishlist(details._id)}
                />
              ) : (
                <CiHeart
                  className="mx-2"
                  onClick={() => addWishlist(details._id)}
                />
              )}
              <div className="d-flex justify-content-between">
                <h5>{details.price} EGP</h5>
                <h5>
                  {" "}
                  <FaStar className="rating-color" /> {details.ratingsAverage}
                </h5>
              </div>
              <button
                className="btn bg-main w-100 text-white"
                onClick={() => addCart(details.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Details;
