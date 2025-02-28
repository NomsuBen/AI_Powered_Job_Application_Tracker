import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import JobApplicationList from "../components/JobApplicationList";
import JobApplicationForm from "../components/JobApplicationForm";
import JobRecommendations from "../components/JobRecommendations";
import ResumeFeedback from "../components/ResumeFeedback";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Use environment variable for API URL, fallback to Heroku backend URL
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  // ✅ Check for token and fetch applications
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Checking token in Dashboard:", token);

    if (!token) {
      console.log("No token found! Redirecting to login...");
      router.push("/login");
    } else {
      fetchApplications(token);
    }
  }, [searchTerm, statusFilter]);

  // ✅ Fetch Job Applications
  const fetchApplications = async (token) => {
    setLoading(true);
    setError("");

    console.log("Fetching applications with token:", token);

    try {
      const res = await axios.get(
        `${API_URL}/applications?search=${searchTerm}&status=${statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Applications fetched successfully:", res.data);
      setApplications(res.data);
    } catch (err) {
      console.error("API Request Failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to fetch applications. Please check authentication."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Delete Application
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications(token);
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* ✅ Navbar with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

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

      {/* ✅ Job Application Form */}
      <JobApplicationForm onApplicationAdded={fetchApplications} />

      {/* ✅ Job Application List */}
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No job applications found.</p>
      ) : (
        <JobApplicationList
          applications={applications}
          onDelete={handleDelete}
        />
      )}

      {/* ✅ Job Recommendations */}
      <JobRecommendations />

      {/* ✅ Resume Feedback */}
      <ResumeFeedback />
    </div>
  );
}
