import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        AI-Powered Job Application Tracker
      </h1>
      <div>
        <Link href="/login" className="text-blue-500 mx-2">
          Login
        </Link>
        <Link href="/register" className="text-blue-500 mx-2">
          Register
        </Link>
      </div>
    </div>
  );
}
