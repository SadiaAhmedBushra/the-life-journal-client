import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="text-center py-20">
        <FaExclamationTriangle className='text-red-400 mx-auto mb-4' size={70} />

      <h1 className="text-3xl font-bold text-red-400">Payment Cancelled</h1>
      <p className="mt-4 text-lg">
        Dear user, no money was transferred from your account. Please try again later.
      </p>
    </div>
  );
};
export default PaymentCancelled;
