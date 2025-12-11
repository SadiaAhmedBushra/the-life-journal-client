import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment/success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  
  return (
    <div className="text-center py-20">
      <FaCheckCircle className="text-secondary mx-auto mb-4" size={70} />
      <h1 className="text-3xl font-bold text-secondary">Payment Successful!</h1>
      
      <p className="mt-4 text-lg">
        Enjoy a premium experience with The Life Journal 🎉
      </p>
    </div>
  );
};

export default PaymentSuccess;
