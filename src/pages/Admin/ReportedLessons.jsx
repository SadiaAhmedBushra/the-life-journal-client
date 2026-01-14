import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [reports, setReports] = useState([]);

  const { data: lessons = [], isLoading, refetch } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  const openReports = async (lesson) => {
    setSelectedLesson(lesson);
    const res = await axiosSecure.get(
      `/admin/reported-lessons/${lesson._id}/reports`
    );
    setReports(res.data);
  };

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .delete(`/lessons/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The reported lesson has been deleted.",
              icon: "success",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Failed to delete the lesson.",
          });
        });
    }
  });
};


  const handleIgnore = async (id) => {
    await axiosSecure.patch(`/admin/reported-lessons/ignore/${id}`);
    refetch();
  };

  if (isLoading) {
  return <LoadingSpinner />;
}

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold my-10 text-center text-primary">
        Reported Lessons
      </h2>
      <h2 className="text-xl font-bold mb-4">Total Reported Lessons: {lessons.length}</h2>

      <table className="table w-full">
        <thead className="bg-gray-200">
          <tr>
            <th>Lesson Title</th>
            <th>Report Count</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id}>
              <td>{lesson.lessonTitle}</td>
              <td>{lesson.ReportCount}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => openReports(lesson)}
                >
                  View Reports
                </button>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDelete(lesson._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleIgnore(lesson._id)}
                >
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLesson && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Reports for: {selectedLesson.lessonTitle}
            </h3>

            {reports.map((r, idx) => (
              <div key={idx} className="bg-primary/10 shadow-sm p-2 mb-2 rounded-lg">
                <p className="font-semibold">{r.reporterUserId}</p>
                <p className="text-sm">{r.reason}</p>
                <p className="text-xs opacity-70">
                  {new Date(r.timestamp).toLocaleString()}
                </p>
              </div>
            ))}

            <form method="dialog">
              <button
                className="btn btn-secondary w-full mt-3"
                onClick={() => setSelectedLesson(null)}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReportedLessons;
