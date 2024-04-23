import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContent = createContext()
let headers = { token: localStorage.getItem("userToken") }
function addToCart(id) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: id }, {
        headers
    }).then((res) => res).catch((err) => err)
}

function getCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers
    }).then((res) => res).catch((err) => err)
}

function deleteProductCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers
    }).then((res) => res).catch((err) => err)
}
function addTowishlist(id) {
        
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: id }, {  headers } )
        .then((response) => response).catch((error) => error)
}

function getUserWishlist() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",  { headers } )
        .then((response) => response).catch((error) => error)
}
function deletewishProdct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers})
        .then((response) => response).catch((error) => error)
}
function updateProductQuantity(id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    },{
        headers
    }).then((res) => res).catch((err) => err)
}

export default function CartContentProvider(props) {
    const [numberOfCartItem,setNumOfCartItem]=useState(null)
   async function getInitialCart(){
     let {data}= await getCart()
     setNumOfCartItem(data?.numberOfCartItem)
     setCartId(data?.data._id)
    }
    const [cartid,setCartId]=useState(null)
    function onlinePayment(shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000`, {
            shippingAddress
        },{
            headers
        }).then((res) => res).catch((err) => err)
    }
    useEffect(()=>{getInitialCart()},[])

    return <CartContent.Provider value={{ addToCart,getCart,deleteProductCart,updateProductQuantity,onlinePayment,numberOfCartItem,setNumOfCartItem,addTowishlist,getUserWishlist,deletewishProdct }}>
        {props.children}
    </CartContent.Provider>
}