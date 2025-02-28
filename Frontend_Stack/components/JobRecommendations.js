import { useState, useEffect } from "react";

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobRecommendations();
  }, []);

  const fetchJobRecommendations = () => {
    // ✅ Simulated job recommendations (Replace with real API call if needed)
    setJobs([
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Co.",
        description: "Work on cutting edge web applications.",
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "Dev Solutions",
        description: "Build scalable server-side systems.",
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Innovate Inc.",
        description: "Contribute to both frontend and backend.",
      },
    ]);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Job Recommendations</h2>
      {jobs.length === 0 ? (
        <p>No job recommendations available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="border-b py-2">
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
