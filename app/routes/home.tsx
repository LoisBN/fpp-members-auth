import { Link } from "react-router";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Members Portal</h1>
      <p className="text-gray-600 mb-8">Learn Supabase authentication by building a members-only area.</p>
      
      <div className="space-y-3">
        <Link
          to="/login"
          className="block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="block bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}