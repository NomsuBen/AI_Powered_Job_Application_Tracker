import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        // ✅ Fixed API URL
        email,
        password,
      });

      console.log("Registration Successful:", res.data);

      // Save token in local storage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || "Registration failed";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md"
      >
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
          Register
        </button>
      </form>
    </div>
  );
}
