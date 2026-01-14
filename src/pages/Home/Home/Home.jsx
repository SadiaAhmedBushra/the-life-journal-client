import React from "react";
import Banner from "../Banner/Banner";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import PublicLessons from "../../Shared/PublicLessons/PublicLessons";
import TopContributors from "../TopContributors/TopContributors";
import MostSavedLessons from "../MostSavedLessons/MostSavedLessons";
import FeaturedLessons from "../FeaturedLessons/FeaturedLessons";
import LearningMatters from "../LearningMatters/LearningMatters";
import DailyReflections from "./DailyReflections";
import WhatMakesUsUnique from "./WhatMakesUsUnique";
import KeyBenefitsFeatures from "./KeyBenefitsFeatures";
import CategoriesSection from "./CategoriesSection";
import StatisticsSection from "./StatisticsSection";
import TestimonialsSection from "../TestimonialsSection";
import LatestArticlesSection from "../LatestArticlesSection";
import FAQSection from "../FAQSection";
import ExpertQandASection from "../ExpertQandASection";
import JoinLearningChallengesSection from "./JoinLearningChallengesSection";

const Home = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner></Banner>
      <KeyBenefitsFeatures></KeyBenefitsFeatures>
      <WhatMakesUsUnique></WhatMakesUsUnique>
      <CategoriesSection></CategoriesSection>
      <LearningMatters></LearningMatters>
      <FeaturedLessons></FeaturedLessons>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
      <JoinLearningChallengesSection></JoinLearningChallengesSection>
      <DailyReflections></DailyReflections>
      <LatestArticlesSection></LatestArticlesSection>
      <ExpertQandASection></ExpertQandASection>
      <TestimonialsSection></TestimonialsSection>
      <StatisticsSection></StatisticsSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
