import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const ReportLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  if (!user) {
    return <p className="p-4">Please log in to report this lesson.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalReason = reason === "Other" ? otherReason.trim() : reason;

    if (!finalReason) {
      toast.error("Please provide a reason.");
      return;
    }

    fetch(`https://the-life-journal-server.vercel.app/lessons/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reporterUserId: user.email,
        reason: finalReason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Report submitted");
          navigate("/public-lessons");
        } else {
          toast.error(data.error || "Failed to submit report");
        }
      })
      .catch(() => toast.error("Failed to submit report"));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 rounded-lg">
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
          <option value="Inappropriate Content">Inappropriate Content</option>
          <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
          <option value="Misleading or False Information">Misleading or False Information</option>
          <option value="Spam or Promotional Content">Spam or Promotional Content</option>
          <option value="Sensitive or Disturbing Content">Sensitive or Disturbing Content</option>
          <option value="Other">Other</option>
        </select>

        {reason === "Other" && (
          <textarea
            className="w-full border p-2 rounded mb-4"
            rows={3}
            placeholder="Please specify..."
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            required
          />
        )}

        <button className="btn btn-primary w-full" type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportLesson;
