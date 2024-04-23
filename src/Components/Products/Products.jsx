import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CartContent } from "../../Context/CartContent";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { FaStar } from "react-icons/fa";

import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";
function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  let {
    addToCart,
    setNumOfCartItem,
    deletewishProdct,
    addTowishlist,
    getUserWishlist,
  } = useContext(CartContent);
  async function addWishlist(id) {
    let response = await addTowishlist(id);
    if (response.data.status == "success") {
      setFilteredProducts(
        filteredProducts.map((item) => {
          return item._id === id ? { ...item, isWish: true } : item;
        })
      );
      // console.log(response.data);
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
  }, [searchQuery, data?.data]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className="container py-5">
        <input
          id="searchItem"
          value={searchQuery}
          onInput={handleSearchChange}
          type="text"
          className="form-control py-2 w-75 mx-auto "
          placeholder="Search By Name..."
        />
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
          <div className="row my-5">
            {filteredProducts?.map((ele) => (
              <div key={ele.id} className="col-md-3">
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
                  {/* <i
                    onClick={() => addTowishlist(id)}
                    className={`cursor-pointer  ${
                      useLocation().pathname === "/favorite"
                        ? "fa fa-trash-can btn btn-outline-danger border-0   "
                        : hart?.includes(id)
                        ? "fa-solid fa-heart text-main"
                        : "fa-regular fa-heart"
                    }`}
                  ></i> */}
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

export default Products;
