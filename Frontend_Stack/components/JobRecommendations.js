import { useState, useEffect } from "react";
import axios from "axios";

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Use environment variable for API URL, fallback to Heroku backend URL
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  useEffect(() => {
    fetchJobRecommendations();
  }, []);

  const fetchJobRecommendations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/jobs/recommendations`);
      setJobs(response.data); // ✅ Update jobs state with real API data
    } catch (error) {
      console.error(
        "Failed to fetch job recommendations:",
        error.response?.data || error
      );
      setError("Failed to fetch job recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Job Recommendations</h2>

      {loading && (
        <p className="text-blue-500">Loading job recommendations...</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>No job recommendations available.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border-b py-2">
              <p className="font-bold">
                {job.title} at {job.company}
              </p>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
