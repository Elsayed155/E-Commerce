import React from 'react'
import styles from "./NotFound.module.css"
import notFoundIage from "../../Assets/images/error.svg"
function NotFound() {
    return (
        <>
        <section className='my-5 container'>
            <img src={notFoundIage} className='w-75' alt="" />
        </section>
        </>
    )
}

export default NotFound
