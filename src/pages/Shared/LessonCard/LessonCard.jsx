import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdLockPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const LessonCard = ({ lesson }) => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const userIsLoggedIn = !!user;
  const isPremiumLesson = lesson.accessLevel === "premium";
  const userIsPremium = role === "Premium";

  const showBlurred =
    isPremiumLesson && (!userIsLoggedIn || (userIsLoggedIn && !userIsPremium));

  const [liked, setLiked] = useState(() =>
    user ? lesson.likes?.includes(user.email) : false
  );

  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
  const [favoritesCount] = useState(lesson.favoritesCount || 0);
  const [viewsCount] = useState(lesson.viewsCount || 0);

  const handleLikeClick = () => {
    if (!userIsLoggedIn) {
      toast.warning("Please log in to like");
      navigate("/auth/login");
      return;
    }

    fetch(`http://localhost:3000/lessons/${lesson._id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLiked(data.liked);
          setLikesCount((prev) => prev + data.likesCountChange);
        } else {
          toast.error("Failed to update like");
        }
      })
      .catch(() => toast.error("Failed to update like"));
  };

  const handleReportClick = () => {
    if (!userIsLoggedIn) {
      toast.warning("Please log in to report");
      navigate("/auth/login");
      return;
    }

    Swal.fire({
      title: "Do you really want to report this lesson?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, report",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/report-lesson/${lesson._id}`);
      }
    });
  };

  const handleDetailsClick = () => {
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
    <div
      className="relative rounded-lg p-4 transition max-w-sm flex flex-col"
      style={{ boxShadow: "0 12px 30px rgba(137,139,240,0.25)" }}
    >
      {showBlurred && (
        <div
          className="bg-primary/50 backdrop-blur-sm absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 gap-4"
          style={{ zIndex: 10 }}
        >
          <MdLockPerson size={48} />
          <p className="text-lg font-semibold">
            Premium Lesson – Upgrade to view
          </p>

          {userIsLoggedIn ? (
            <button
              onClick={() => navigate("/payment")}
              className="btn btn-primary px-6 py-2 rounded"
            >
              Upgrade Now
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="btn btn-primary px-6 py-2 rounded"
            >
              Log In to Upgrade
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={lesson.creatorPhoto || "/default-profile.png"}
            alt={lesson.creatorName}
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-medium">{lesson.creatorName}</span>
            <span className="text-xs text-gray-500">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-1">{lesson.lessonTitle}</h3>

        <p className="mb-4 line-clamp-3">{lesson.description}</p>

        <div className="flex flex-wrap gap-2 my-4">
          <span className="inline-block bg-secondary/10 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {lesson.category}
          </span>

          <span className="inline-block bg-primary/10 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {lesson.emotionalTone}
          </span>

          <span className="text-secondary text-xs font-bold px-1 py-1">
            #{lesson.accessLevel.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-4 mb-4 text-sm">
          <button
            onClick={handleLikeClick}
            className="flex items-center gap-1 "
          >
            <span className="text-red-500">{liked ? "❤️" : "🤍"}</span>{" "}
            {likesCount} Likes
          </button>

          <span>🔖 {favoritesCount} Favorites</span>
          <span>👁️ {viewsCount} Views</span>
          <div className="flex items-center gap-2">
            <FacebookShareButton
              url={`https://your-domain.com/lesson/${lesson._id}`}
            >
              <FacebookIcon size={15} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={`https://your-domain.com/lesson/${lesson._id}`}
            >
              <TwitterIcon size={15} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={`https://your-domain.com/lesson/${lesson._id}`}
            >
              <WhatsappIcon size={15} round />
            </WhatsappShareButton>
          </div>
        </div>

        <button
          onClick={handleDetailsClick}
          className="mb-2 btn btn-primary w-full"
        >
          See Details
        </button>

        <button
          onClick={handleReportClick}
          className="btn btn-secondary w-full"
        >
          Report Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
