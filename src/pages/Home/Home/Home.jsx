import React from "react";
import Banner from "../Banner/Banner";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import PublicLessons from '../../Shared/PublicLessons/PublicLessons'
import TopContributors from '../TopContributors/TopContributors'
import MostSavedLessons from '../MostSavedLessons/MostSavedLessons';

const Home = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
      <PublicLessons></PublicLessons>
      <Banner />
      
      
    </div>
  );
};

export default Home;




