import React, { useContext, useEffect, useState } from "react";
import styles from "./FavouriteItem.module.css";
import { CartContent } from "../../Context/CartContent";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
function FavouriteItem() {
  const [wishlistDetails, setWishListDetails] = useState({});
  let { getUserWishlist, deletewishProdct, addToCart, setNumOfCartItem } =
    useContext(CartContent);
  const [wishProduct, setWishProduct] = useState([]);

  async function removeItem(id) {
    let { data } = await deletewishProdct(id);
    if (data.status == "success") {
      setWishProduct((prev) => [...prev.filter((item) => item.id !== id)]);
      toast.success("Product removed successfully");
      setWishListDetails(data);
    } else {
      toast.error("Failed To Remove Product");
    }
  }
  async function getWishlistDetails() {
    let { data } = await getUserWishlist();
    setWishListDetails(data);
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
  useEffect(() => {
    getWishlistDetails();
  }, []);

  let { data: wishProducts, isLoading } = useQuery(
    "wishlist",
    getUserWishlist,
    {}
  );
  useEffect(() => {
    setWishProduct(wishProducts?.data?.data);
  }, [wishProducts?.data?.data]);
  // let wisharr = wishProducts?.data?.data?.map((item) => item._id);
  // console.log(wishProducts);
  return (
    <>
      <Helmet>
        <title>Favourite Products</title>
      </Helmet>
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
        <div className=" container  my-5 ">
          <div className="row w-75 mx-auto bg-main-light p-5 ">
            {wishProduct?.length >= 1 ? (
              wishProduct.map((ele) => (
                <div key={ele._id} className="row py-2 border-bottom">
                  <div className="col-md-2">
                    <img src={ele.imageCover} className="w-100" alt="" />
                  </div>
                  <div className="col-md-10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="left-side">
                        <h4>{ele.title}</h4>
                        <p>{ele.price} EGP</p>
                      </div>
                      <button
                        onClick={() => addCart(ele.id)}
                        className="btn bg-main-light border border-secondary"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <button
                      className="btn text-danger p-0"
                      onClick={() => removeItem(ele.id)}
                    >
                      <i className="fa fa-trash-can"></i> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className=" alert alert-success d-flex justify-content-center align-items-center my-5 py-5 ">
                <h3> your Wish List Is Empty </h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* {isLoading?(
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
      ): <div className="container my-5">
          <div className="row w-75 mx-auto bg-main-light p-5">
          <h1 className="mb-4">My Wlish List</h1>

            {wisharr?.length>=1?( 
               {wishProducts?.data?.data.map((ele) => (
              <div key={ele._id} className="row py-2 border-bottom">
                <div className="col-md-2">
                  <img src={ele.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="left-side">
                      <h4>{ele.title}</h4>
                      <p>{ele.price} EGP</p>
                    </div>
                    <button
                      onClick={() => addCart(ele.id)}
                      className="btn bg-main-light border border-secondary"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <button
                    className="btn text-danger p-0"
                    onClick={() => removeItem(ele.id)}
                  >
                    <i className="fa fa-trash-can"></i> Remove
                  </button>
                </div>
              </div>
            ))}): <div className=" alert alert-success d-flex justify-content-center align-items-center my-5 py-5 ">
            <h3> your Wish List Is Empty </h3>
          </div>}
          </div>
      </div>


    
 
               } */}
    </>
  );
}

export default FavouriteItem;
