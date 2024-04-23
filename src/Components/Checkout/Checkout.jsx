import React, { useContext } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik'
import { CartContent } from '../../Context/CartContent'
function Checkout() {
    let {onlinePayment}=useContext(CartContent)
    async function payment(values){
        let{data}=await onlinePayment(values)
        window.location.href=data.session.url
    }
    let formik=useFormik({initialValues:{
        "details": "",
        "phone": "",
        "city": ""
    },onSubmit:payment})
    return (
        <>
        <div className="container">
            <div className="mx-auto bg-main-light p-5">
                <h2>Shipping Address</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="details">Details</label>
                        <input type="text" className='form-control' name="details" id="details" value={formik.values.details} onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className='form-control' name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="city">City</label>
                        <input type="text" className='form-control' name="city" id="city" value={formik.values.city} onChange={formik.handleChange}/>
                    </div>
                    <button className='btn bg-main w-100 text-white'>Pay Now:D</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Checkout
