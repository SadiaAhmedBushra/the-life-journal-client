import React from "react";
import { FaCheckCircle } from "react-icons/fa";


const PaymentSuccess = () => {
  return (
    <div className="text-center py-20">
        <FaCheckCircle className='text-secondary mx-auto mb-4' size={70} />
      <h1 className="text-3xl font-bold text-secondary">
        Payment Successful!
      </h1>
      <p className="mt-4 text-lg">Enjoy a premium experience with The Life Journal 🎉</p>
    </div>
  );
}

export default PaymentSuccess;
