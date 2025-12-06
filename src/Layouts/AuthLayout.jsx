import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
// import authImg from '../assets/login-register-page-img.jpg';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
                <Navbar></Navbar>
            <div className='w-full max-w-7xl mx-auto '>
            
            <div className='flex items-center justify-between gap-8 mt-10 mb-20'>
                {/* <div className='flex-1 '>
                    <img src={authImg} alt="auth image" />
                </div> */}
                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>
                
            </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;