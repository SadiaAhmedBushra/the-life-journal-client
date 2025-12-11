import React from "react";
import Banner from "../Banner/Banner";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Home = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner />
      {/* <Brands></Brands> */}
      {/* <Reviews></Reviews> */}
    </div>
  );
};

export default Home;
