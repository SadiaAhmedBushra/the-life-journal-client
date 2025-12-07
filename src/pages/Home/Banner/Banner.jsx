import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import b1Img from "../../../assets/bannerslider1.jpg";
// import b2Img from "../../../assets/bannerslider5.jpeg";
// import b3Img from "../../../assets/bannerslider4.jpg";
import b1Img from "../../../assets/write3.jpg";
import b2Img from "../../../assets/growth2.jpg";
import b3Img from "../../../assets/learn.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="my-6 lg:rounded-2xl overflow-hidden shadow-2xl">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        interval={3000}
      >
        {/* SLIDE 1 */}
        <div
          className="h-[400px] lg:h-[600px] bg-cover bg-center relative flex items-center justify-center"
          style={{ backgroundImage: `url(${b1Img})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 text-center px-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Save Your Life Lessons
            </h1>
            <p className="text-lg mb-6 text-[#C9C8C7]">
              Capture your experiences, wisdom, and reflections in one secure
              digital space.
            </p>
            <Link to="/add-lesson" className="btn btn-primary">
              Start Writing
            </Link>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div
          className="h-[400px] lg:h-[600px] bg-cover bg-center relative flex items-center justify-center"
          style={{ backgroundImage: `url(${b2Img})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute left-12 lg:left-10 top-1/2 -translate-y-1/2 z-10  text-left">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
              Track Your Growth
            </h1>
            <p className="text-lg mb-6 text-[#C9C8C7]">
              Monitor your progress, revisit your reflections, and grow
              mindfully.
            </p>
            <Link to="/dashboard" className="btn btn-secondary">
              View Progress
            </Link>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div
          className="h-[400px] lg:h-[600px] bg-cover bg-center relative flex items-center justify-center"
          style={{ backgroundImage: `url(${b3Img})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute left-12 md:left-24 top-1/2 -translate-y-1/2 z-10  text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
              Learn From the Community
            </h1>
            <p className="text-lg mb-6 text-[#C9C8C7]">
              Explore real wisdom shared by people all over the world.
            </p>
            <Link to="/lessons" className="btn btn-primary">
              Explore Lessons
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
