import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto bg-main pt-16'>
            <Navbar></Navbar>
            <Outlet className=""></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;