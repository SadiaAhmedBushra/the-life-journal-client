import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const ReportLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/lessons/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reporterUserId: user.email,
        reason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Report submitted");
          navigate("/public-lessons");
        }
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Report This Lesson</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Reason</label>

        <select
          className="w-full border p-2 rounded mb-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="">Select one</option>
          <option>Inappropriate Content</option>
          <option>Hate Speech or Harassment</option>
          <option>Misleading or False Information</option>
          <option>Spam or Promotional Content</option>
          <option>Sensitive or Disturbing Content</option>
          <option>Other</option>
        </select>

        <button className="btn btn-primary w-full" type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportLesson;
