import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { FaStar } from "react-icons/fa";

import { date } from "yup";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContent } from "../../Context/CartContent";
import toast from "react-hot-toast";

function FeaturedProducts() {
  let {
    addToCart,
    setNumOfCartItem,
    addTowishlist,
    deletewishProdct,
    getUserWishlist,
  } = useContext(CartContent);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function addWishlist(id) {
    let response = await addTowishlist(id);
    if (response.data.status == "success") {
      setFilteredProducts(
        filteredProducts.map((item) => {
          return item._id === id ? { ...item, isWish: true } : item;
        })
      );
      toast.success("Product added successfully");
    } else {
      toast.error("Failed To Add Product");
    }
  }
  async function removeWishlist(id) {
    let response = await deletewishProdct(id);
    if (response.data.status == "success") {
      setFilteredProducts(
        filteredProducts.map((item) => {
          return item._id === id ? { ...item, isWish: false } : item;
        })
      );
      toast.success("Product removed successfully");
    } else {
      toast.error("Failed To Add Product");
    }
  }
  // async function addWishlist(id) {
  //   let response = await addTowishlist(id);
  //   if (response.data.status == "success") {
  //     data?.data.map((item) => {
  //       return item._id === id ? { ...item, isWish: true } : item;
  //     });
  //     toast.success("Product added successfully");
  //   } else {
  //     toast.error("Failed To Add Product");
  //   }
  // }
  // async function removeWishlist(id) {
  //   let response = await deletewishProdct(id);
  //   if (response.data.status == "success") {
  //     data?.data.map((item) => {
  //       return item._id === id ? { ...item, isWish: false } : item;
  //     });
  //     toast.success("Product removed successfully");
  //   } else {
  //     toast.error("Failed To Add Product");
  //   }
  // }
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == "success") {
      toast.success("Product added successfully");
      setNumOfCartItem(res.data.numOfCartItems);
    } else {
      toast.error("Failed To Add Product");
    }
  }

  const [wishProduct, setWishProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const [respon] = await Promise.all([getUserWishlist()]);
      setWishProduct(respon.data.data.map((item) => item._id));
    };
    fetchData();
  }, []);

  async function getAllProducts() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => ({
        ...data,
        data: data.data.map((item) => {
          return {
            ...item,
            isWish: wishProduct?.includes(item._id),
          };
        }),
      }));
  }
  let { isLoading, data } = useQuery(
    ["Alldproduct", wishProduct],
    getAllProducts
  );
  useEffect(() => {
    // Filter products based on search query
    const filtered = data?.data.filter((product) =>
      product.category.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [data?.data]);

  return (
    <>
      <div className="container py-5">
        <h2>Featured Products</h2>
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
            {filteredProducts?.map((ele) => (
              <div key={ele.id} className="col-md-2">
                <div className="product">
                  <Link to={"/details/" + ele.id}>
                    <img
                      src={ele.imageCover}
                      className="w-100"
                      alt={ele.title}
                    />
                    <div className="content mx-2">
                      <p className="text-main">{ele.category.name}</p>
                      <h3 className="h6">
                        {ele.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <p>{ele.price} EGP</p>
                        <p>
                          <FaStar className="rating-color" />

                          {ele.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  </Link>
                  {ele.isWish ? (
                    <FaHeart
                      className="mx-2"
                      onClick={() => removeWishlist(ele.id)}
                    />
                  ) : (
                    <CiHeart
                      className="mx-2"
                      onClick={() => addWishlist(ele.id)}
                    />
                  )}
                  <button
                    className="btn bg-main text-white w-100 my-2"
                    onClick={() => addCart(ele.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FeaturedProducts;
