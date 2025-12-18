import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import formbg from "../../../assets/formbg1.webp";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handlePayment = async () => {
  try {
    const paymentInfo = {
      name: "Premium Membership – Lifetime",
      description: "Unlimited lessons, ad-free, premium features",
      price: 1500,
      quantity: 1,
      email: user?.email,
      image: "https://i.ibb.co/SX1Tq2W/premium.png",
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Failed to start payment. Please try again.");
  }
};


  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const role = userData?.role || "freeUser";
  const paymentStatus = userData?.paymentStatus || "unpaid";

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Why Upgrade to Premium?
      </h1>
      <div className="flex flex-row gap-2 justify-center hover:backdrop-blur-sm">
        <button
          className="rounded-full py-8 px-5 font-semibold text-muted "
          style={{ backgroundImage: `url(${formbg})` }}
        >
          Enjoy Unlimited Lesson Creation
        </button>
        <button
          className="rounded-full py-8 px-5 font-semibold text-muted"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          Better User Experience
        </button>
        <button
          className="rounded-full py-8 px-5 font-semibold text-muted"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          Lifetime subscription only @ 1500 BDT!
        </button>
      </div>

      <h3 className="text-2xl font-bold text-center my-8 text-primary">
        Compare and give it a second thought!
      </h3>

      <table
        className="table w-full mb-10 rounded-lg"
        style={{ backgroundImage: `url(${formbg})` }}
      >
        <thead>
          <tr className="">
            <th>Features</th>
            <th>Free</th>
            <th>Premium (৳1500)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="backdrop-blur-sm bg-white/60">
            <td>Save Personal Lessons</td>
            <td>Up to 10</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Create Premium Lessons</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr className="backdrop-blur-sm bg-white/60">
            <td>View Premium Lessons</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Ad-Free Experience</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr className="backdrop-blur-sm bg-white/60">
            <td>Priority Search Ranking</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Faster Page Loading</td>
            <td>Normal</td>
            <td>Optimized</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center">
        <button onClick={handlePayment} className="btn btn-primary btn-lg">
          Upgrade to Premium (৳1500)
        </button>

      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Payment;
