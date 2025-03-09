import axios from "axios";
import { useEffect, useState } from "react";

export default function JobApplicationList({ onDelete }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications(res.data.applications || []);
      } catch (err) {
        console.error(
          "❌ Error fetching applications:",
          err.response?.data || err
        );
        alert("Failed to fetch applications. Please check authentication.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setApplications(applications.filter((app) => app._id !== id));
      onDelete(id);
    } catch (err) {
      console.error(
        "❌ Failed to delete application:",
        err.response?.data || err
      );
      alert("Error deleting application.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Your Applications</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
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
              </div>
              <button
                onClick={() => handleDelete(app._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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
