import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newApplication, setNewApplication] = useState({
    jobTitle: "",
    companyName: "",
    applicationDate: "",
    applicationStatus: "Applied",
    notes: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Checking token in Dashboard:", token); // ✅ Debugging

    if (!token) {
      console.log("No token found! Redirecting to login...");
      router.push("/login");
    } else {
      fetchApplications(token);
    }
  }, [searchTerm, statusFilter]);

  const fetchApplications = async (token) => {
    setLoading(true);
    setError(""); // ✅ Clear old errors

    console.log("Fetching applications with token:", token); // ✅ Debugging

    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications?search=${searchTerm}&status=${statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Applications fetched:", res.data); // ✅ Debugging
      setApplications(res.data);
    } catch (err) {
      console.error("API Request Failed:", err.response?.data || err.message);
      setError("Failed to fetch applications. Please check authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newApplicationData = {
      jobTitle: newApplication.jobTitle,
      companyName: newApplication.companyName,
      applicationStatus: newApplication.applicationStatus || "Applied",
      applicationDate:
        newApplication.applicationDate ||
        new Date().toISOString().split("T")[0],
      notes: newApplication.notes,
    };

    console.log("Sending Job Application Data:", newApplicationData); // ✅ Debugging

    try {
      const res = await axios.post(
        "http://localhost:5000/api/applications",
        newApplicationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Application Created:", res.data); // ✅ Debugging
      fetchApplications(token);
      setNewApplication({
        jobTitle: "",
        companyName: "",
        applicationDate: "",
        applicationStatus: "Applied",
        notes: "",
      });
    } catch (err) {
      console.error(
        "Error adding application:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.error || "Failed to add application.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications(token);
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* ✅ Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ✅ Add New Job Application Form */}
      <form
        onSubmit={handleAddApplication}
        className="bg-white p-4 rounded shadow mb-4"
      >
        <input
          type="text"
          placeholder="Job Title"
          value={newApplication.jobTitle}
          onChange={(e) =>
            setNewApplication({ ...newApplication, jobTitle: e.target.value })
          }
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={newApplication.companyName}
          onChange={(e) =>
            setNewApplication({
              ...newApplication,
              companyName: e.target.value,
            })
          }
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="date"
          value={newApplication.applicationDate}
          onChange={(e) =>
            setNewApplication({
              ...newApplication,
              applicationDate: e.target.value,
            })
          }
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Notes"
          value={newApplication.notes}
          onChange={(e) =>
            setNewApplication({ ...newApplication, notes: e.target.value })
          }
          className="border p-2 w-full mb-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Application
        </button>
      </form>

      {/* ✅ Show Loading, Error, or Applications */}
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No job applications found.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {applications.map((app) => (
            <li key={app._id} className="border-b py-2">
              <strong>{app.jobTitle}</strong> at {app.companyName} (
              {app.applicationStatus})
              <button
                onClick={() => handleDelete(app._id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
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
