import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // You can add headers or other configurations here
});
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;