import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaLock } from "react-icons/fa";

const FeaturedLessons = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const fetchFeaturedLessons = async () => {
    const res = await axios.get(
      "http://localhost:3000/lessons?isFeatured=true"
    );
    return res.data;
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: fetchFeaturedLessons,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading featured lessons</div>;
  if (data.length === 0) return <div>No featured lessons found.</div>;

  return (
    <section className="my-12 lg:my-24 px-3 sm:px-6 lg:px-14">
      <div className="text-center mb-8 lg:mb-14">
        <div className="flex flex-row items-center justify-center text-primary gap-2">
          <FaStar size={20} />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Featured Lessons
          </h2>
          <FaStar size={20} />
        </div>

        <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
          Hand-picked lessons loved by learners — grow through real-life
          experiences.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}         
        breakpoints={{
          640: { slidesPerView: 1.4 },  
          768: { slidesPerView: 2 },    
          1024: { slidesPerView: 3 },   
        }}
      >
        {data.map((lesson) => {
          const userIsLoggedIn = !!user;
          const isPremiumLesson = lesson.accessLevel === "premium";
          const userIsPremium = role === "Premium" || role === "admin";

          const isBlurred =
            isPremiumLesson &&
            (!userIsLoggedIn || (userIsLoggedIn && !userIsPremium));

          const handleExploreClick = () => {
            if (!userIsLoggedIn) {
              navigate("/auth/login");
              return;
            }

            if (isPremiumLesson && !userIsPremium) {
              navigate("/payment");
              return;
            }

            navigate(`/lesson/${lesson._id}`);
          };

          return (
            <SwiperSlide key={lesson._id}>
              <div
                className="relative h-full rounded-2xl bg-white p-4 sm:p-5 lg:p-6 flex flex-col transition hover:-translate-y-1"
                style={{
                  boxShadow: "0 15px 35px rgba(137,139,240,0.25)",
                }}
              >
                <span className="absolute top-4 right-4 bg-secondary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10">
                  <FaStar size={12} /> Featured
                </span>

                {isBlurred && (
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center text-center z-20 rounded-2xl">
                    <FaLock className="text-primary text-3xl mb-2" />
                    <p className="text-sm font-semibold mb-3">
                      Premium Lesson – Upgrade to Access
                    </p>

                    <button
                      onClick={() =>
                        navigate(userIsLoggedIn ? "/payment" : "/auth/login")
                      }
                      className="btn btn-primary btn-sm"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}

                <div className={isBlurred ? "blur-sm pointer-events-none" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={lesson.creatorPhoto || "/default-profile.png"}
                      alt={lesson.creatorName}
                      className="w-9 h-9 lg:w-11 lg:h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm lg:text-base font-semibold">
                        {lesson.creatorName}
                      </p>
                      <p className="text-xs text-muted">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 line-clamp-2">
                    {lesson.lessonTitle}
                  </h3>

                  <p className="text-sm lg:text-base text-muted line-clamp-3 mb-3">
                    {lesson.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted mb-4">
                    <div className="flex flex-row justify-between items-center gap-1">
                      <IoEyeSharp className="text-secondary" size={17} />
                      <p> {lesson.views || 0}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center gap-1">
                      <AiFillLike className="text-secondary" size={16} />
                      <p> {lesson.likesCount || 0}</p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2 mb-5">
                    <p className="bg-secondary/10 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {lesson.category}
                    </p>

                    <p className="bg-primary/10 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {lesson.emotionalTone}
                    </p>

                    <p className="text-secondary text-xs font-bold">
                      #{lesson.accessLevel}
                    </p>
                  </div>

                  <button
                    onClick={handleExploreClick}
                    className="btn btn-primary w-full"
                  >
                    Explore Lesson
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default FeaturedLessons;
