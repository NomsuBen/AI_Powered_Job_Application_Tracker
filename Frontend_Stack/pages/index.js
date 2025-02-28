import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        AI-Powered Job Application Tracker
      </h1>
      <div>
        <Link href="/login">
          <a className="text-blue-500 mx-2">Login</a>
        </Link>
        <Link href="/register">
          <a className="text-blue-500 mx-2">Register</a>
        </Link>
      </div>
    </div>
  );
}
