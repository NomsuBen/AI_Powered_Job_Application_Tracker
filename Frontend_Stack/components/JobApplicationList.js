import axios from "axios";
import { useEffect, useState } from "react";

export default function JobApplicationList({ applications = [], onDelete }) {
  // ✅ Use environment variable for API URL, fallback to Heroku backend URL
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  console.log("🔍 API_URL:", API_URL); // Debugging API URL

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Deleted Successfully:", response.data);
      onDelete(id); // ✅ Update UI after successful deletion
    } catch (err) {
      console.error(
        "❌ Failed to delete application:",
        err.response?.data || err
      );
      alert(
        `Error: ${
          err.response?.data?.message || "Failed to delete application."
        }`
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Your Applications</h2>

      {applications?.length === 0 ? (
        <p className="text-gray-600">No applications found</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li
              key={app._id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-800">
                  {app.jobTitle} at {app.companyName}
                </p>
                <p className="text-gray-600">Status: {app.applicationStatus}</p>
                <p className="text-gray-600">
                  Notes: {app.notes ? app.notes : "No additional notes"}
                </p>
                <p className="text-gray-600">
                  Date Applied:{" "}
                  {app.dateApplied
                    ? new Date(app.dateApplied).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(app._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-200 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
