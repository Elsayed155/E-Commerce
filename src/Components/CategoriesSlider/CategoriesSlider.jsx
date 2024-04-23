import React, { useEffect, useState } from 'react'
import styles from "./CategoriesSlider.module.css"
import axios from "axios";
import Slider from 'react-slick';
function CategoriesSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1
      };
    const [categories,setCategories]=useState([])
    async function getCategories(){
        let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data)
    }
    useEffect(()=>{
        getCategories()
    },[])
    return (
        <>
        <div className="container my-5">
        <h2>Shoo Popular Categories</h2>
        <Slider {...settings}>
            {categories.map(cat=>  <div className="category px-1">
            <img src={cat.image} className='w-100 ' height={"200"} alt="" />
            <h5>{cat.name}</h5>
        </div>)}

        </Slider>
        </div>
       
      
        </>
    )
}

export default CategoriesSlider
