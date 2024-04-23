import React from 'react'
import styles from "./Layout.module.css"
import {Outlet} from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast'
function Layout() {
    return (
        <>
        <Navbar/>


        <Outlet/>
        <Toaster/>
        
        <Footer/>
        </>
    )
}

export default Layout
