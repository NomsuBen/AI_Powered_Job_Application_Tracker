import axios from "axios";

export default function JobApplicationList({ applications, onDelete }) {
  // ✅ Use environment variable for API URL, fallback to Heroku backend URL
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); // ✅ Get token dynamically

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(id); // ✅ Call delete function passed from `dashboard.js`
    } catch (err) {
      console.error("Failed to delete application:", err.response?.data || err);
      alert("Failed to delete application");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Your Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li
              key={app._id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">
                  {app.jobTitle} at {app.companyName}
                </p>
                <p>Status: {app.applicationStatus}</p>
                <p>Notes: {app.notes}</p>
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
