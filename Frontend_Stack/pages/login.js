// frontend/pages/login.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ✅ FIX: API URL from environment variable
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Login Successful:", res.data);

      if (!res.data.token) {
        throw new Error("No token received from server");
      }

      // ✅ FIX: Store token properly in localStorage
      localStorage.setItem("token", res.data.token);

      console.log(
        "Token saved in localStorage:",
        localStorage.getItem("token")
      );

      setTimeout(() => {
        console.log("Redirecting to dashboard...");
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login failed");

      if (err.response?.data?.msg === "Invalid credentials") {
        console.log("Redirecting to register...");
        router.push("/register");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
