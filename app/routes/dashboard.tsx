import { Link } from "react-router";

export default function Dashboard() {
  // TODO: Check if user is authenticated using supabase.auth.getUser()
  // TODO: If not authenticated, redirect to /login
  // TODO: Display the user's email
  // TODO: Implement handleSignOut using supabase.auth.signOut

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Members Dashboard</h2>
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <p className="text-gray-600 mb-2">Welcome!</p>
        <p className="text-sm text-gray-500">
          TODO: Display the logged-in user's email here
        </p>
      </div>
      <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
        Sign Out
      </button>
      <br />
      <Link to="/" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}