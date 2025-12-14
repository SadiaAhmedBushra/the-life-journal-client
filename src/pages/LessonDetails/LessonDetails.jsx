import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import {
  FaLock,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { BsBookmarkHeart } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

import LessonCard from "../../pages/Shared/LessonCard/LessonCard"; 

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const [commentText, setCommentText] = useState("");

  const { data: lesson = {}, isLoading, error } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: authorLessonsCount = 0 } = useQuery({
    queryKey: ["author-lessons-count", lesson.email],
    queryFn: async () => {
      if (!lesson.email) return 0;
      const res = await axiosSecure.get(`/lessons?email=${lesson.email}`);
      return res.data.length;
    },
    enabled: !!lesson.email,
  });

  useEffect(() => {
    if (lesson && user) {
      setLiked(lesson.likes?.includes(user.email) || false);
      setLikesCount(lesson.likesCount || 0);

      setIsFavorite(lesson.favorites?.includes(user.email) || false);
      setFavoritesCount(lesson.favoritesCount || 0);
    } else if (lesson) {
      setLiked(false);
      setLikesCount(lesson.likesCount || 0);
      setIsFavorite(false);
      setFavoritesCount(lesson.favoritesCount || 0);
    }
  }, [lesson, user]);

  const { data: comments = [] } = useQuery({
    queryKey: ["lesson-comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?lessonId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: similarLessons = [] } = useQuery({
    queryKey: ["similar-lessons", lesson.category, lesson.emotionalTone],
    queryFn: async () => {
      if (!lesson.category || !lesson.emotionalTone) return [];
      const res = await axiosSecure.get(
        `/lessons?category=${lesson.category}&emotionalTone=${lesson.emotionalTone}&limit=20`
      );
      return res.data.filter((l) => l._id !== id).slice(0, 6);
    },
    enabled: !!lesson.category || !!lesson.emotionalTone,
  });

  const likeMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/lessons/${id}/like`, { userId: user.email }),
    onSuccess: (data) => {
      if (data.data.success) {
        setLiked(data.data.liked);
        setLikesCount((prev) => prev + data.data.likesCountChange);
        queryClient.invalidateQueries(["lesson-details", id]);
      }
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/lessons/${id}/favorite`, { userId: user.email }),
    onSuccess: (data) => {
      if (data.data.success) {
        setIsFavorite(data.data.favorited);
        setFavoritesCount((prev) => prev + data.data.favoritesCountChange);
        queryClient.invalidateQueries(["lesson-details", id]);
      }
    },
  });

  const commentMutation = useMutation({
    mutationFn: (newComment) => axiosSecure.post(`/comments`, newComment),
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries(["lesson-comments", id]);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center mt-16 text-lg font-semibold text-red-600">
        Unable to load lesson details. Please try again later.
      </p>
    );

  const createdDate = new Date(lesson.createdAt).toLocaleDateString();
  const updatedDate = new Date(lesson.updatedAt).toLocaleDateString();

  const shareUrl = `https://your-domain.com/lesson/${id}`;

  const handleLikeClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    likeMutation.mutate();
  };

  const handleFavoriteClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    favoriteMutation.mutate();
  };

  return (
    <main className="max-w-5xl mx-auto my-10 p-10  border border-primary rounded-xl bg-white shadow-lg">
      {lesson.image?.url && (
        <img
          src={lesson.image.url}
          alt={lesson.lessonTitle}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}

      

      <header className="mb-10">
        <h1 className="text-5xl font-extrabold mb-2 text-primary flex items-center gap-3">
          {lesson.lessonTitle}
        </h1>
        
      </header>
     <div className="flex flex-wrap gap-2 my-4">
          <span className="inline-block bg-secondary/10 text-green-800 text-lg font-semibold p-2 rounded-full">
            {lesson.category}
          </span>

          <span className="inline-block bg-primary/10 text-blue-800 text-lg font-semibold p-2 rounded-full">
            {lesson.emotionalTone}
          </span>

          <span className="text-secondary text-lg font-bold p-2">
            #{lesson.accessLevel.toLowerCase()}
          </span>
        </div>

      <section className="flex flex-wrap gap-6 mb-12 text-sm text-muted">
        <MetaInfo
          label="Created"
          value={createdDate}
          icon={<FaCalendarAlt className="text-primary" />}
        />
        <MetaInfo
          label="Updated"
          value={updatedDate}
          icon={<FaCalendarAlt className="text-primary" />}
        />
        <MetaInfo
          label="Visibility"
          value={lesson.privacy || "Public"}
          icon={<FaLock className="text-primary" />}
        />
      </section>

      <article className="mb-12 text-lg leading-relaxed whitespace-pre-wrap">
        {lesson.description}
      </article>

      <section className="flex items-center gap-6 mb-12 shadow-xl p-6 rounded-lg bg-primary/10">
        <img
          src={lesson.creatorPhoto || "/default-profile.png"}
          alt={lesson.creatorName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-2xl font-semibold">{lesson.creatorName}</h3>
          <p className="text-gray-600">
            {authorLessonsCount} lesson{authorLessonsCount !== 1 ? "s" : ""} created
          </p>
          <button
            onClick={() => navigate(`/profile/${lesson.email}`)}
            className="mt-2 text-primary font-semibold hover:underline"
          >
            View all lessons by this author
          </button>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-6 mb-12 text-lg">
        <LikeButton liked={liked} likesCount={likesCount} onClick={handleLikeClick} />
        <FavoriteButton
          isFavorite={isFavorite}
          favoritesCount={favoritesCount}
          onClick={handleFavoriteClick}
        />
        <ViewsDisplay views={lesson.views || 0} />

        <div className="flex items-center gap-3 ml-auto">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 border-b-4 border-secondary inline-block">
          Comments
        </h2>

        {user ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (commentText.trim()) {
                commentMutation.mutate({
                  lessonId: id,
                  userId: user.email,
                  userName: user.name,
                  text: commentText.trim(),
                  createdAt: new Date().toISOString(),
                });
              }
            }}
            className="mb-8"
          >
            <textarea
              rows={2}
              className="w-full p-4 border rounded-md resize-none"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 btn-primary"
              disabled={commentMutation.isLoading || !commentText.trim()}
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-muted italic">
            Please{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary underline"
            >
              login
            </button>{" "}
            to post comments.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-2">
          {comments.length === 0 && (
            <p className="text-muted italic">
              No comments yet. Be the first to comment!
            </p>
          )}
          {comments.map(({ _id, userName, text, createdAt }) => (
            <div key={_id} className="p-3 rounded-xl rounded-bl-none bg-secondary/50">
              <p className="font-semibold">{userName}</p>
              <p className="text-white">{text}</p>
              <p className="text-xs text-muted mt-1">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Lessons  ✅ UPDATE */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b-4 border-secondary inline-block">
          Similar Lessons
        </h2>

        {similarLessons.length === 0 && (
          <p className="text-gray-500 italic">No similar lessons found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {similarLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} /> 
          ))}
        </div>
      </section>
    </main>
  );
};

const MetaInfo = ({ label, value, icon }) => (
  <div className="flex items-center gap-2">
    <span className="text-indigo-700">{icon}</span>
    <span>
      <strong>{label}:</strong> {value || "-"}
    </span>
  </div>
);

const LikeButton = ({ liked, likesCount, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
      liked ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
    }`}
    title={liked ? "Unlike" : "Like"}
  >
    <BiLike />
    {likesCount}
  </button>
);

const FavoriteButton = ({ isFavorite, favoritesCount, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
      isFavorite ? "bg-secondary text-white" : "bg-gray-200 text-gray-700"
    }`}
    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
  >
    {isFavorite ? <BsBookmarkHeart /> : <FaRegBookmark />}
    {favoritesCount}
  </button>
);

const ViewsDisplay = ({ views }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold bg-gray-100 text-gray-700 select-none">
    <FaEye />
    {views}
  </div>
);

export default LessonDetails;
