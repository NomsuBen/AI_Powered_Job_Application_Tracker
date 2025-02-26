import axios from "axios";

export default function JobApplicationList({
  applications,
  fetchApplications,
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchApplications();
    } catch (err) {
      console.error(err.response.data);
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
                  {app.title} at {app.company}
                </p>
                <p>Status: {app.status}</p>
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
