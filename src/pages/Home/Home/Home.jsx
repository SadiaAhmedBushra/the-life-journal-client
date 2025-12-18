import React from "react";
import Banner from "../Banner/Banner";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import PublicLessons from "../../Shared/PublicLessons/PublicLessons";
import TopContributors from "../TopContributors/TopContributors";
import MostSavedLessons from "../MostSavedLessons/MostSavedLessons";
import FeaturedLessons from "../FeaturedLessons/FeaturedLessons";
import LearningMatters from "../LearningMatters/LearningMatters";

const Home = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <LearningMatters></LearningMatters>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
    </div>
  );
};

export default Home;
