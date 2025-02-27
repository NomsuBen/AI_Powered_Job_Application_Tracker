import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login");
      router.push("/login");
    } else {
      fetchApplications(token);
    }
  }, []);

  const fetchApplications = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed Header
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token"); // ✅ Remove invalid token
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ul>
        {applications.map((app) => (
          <li key={app._id} className="border-b py-2">
            {app.title} at {app.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
