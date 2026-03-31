import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { Card, CardContent } from "~/components/Card";
import { Button } from "~/components/Button";
import { useToast } from "~/components/Toast";
import { supabase, isSupabaseConfigured } from "~/lib/supabase";
import { log } from "~/lib/logger";

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    log.ui("Dashboard page mounted");
    checkAuth();
  }, []);

  const checkAuth = async () => {
    log.auth("Checking authentication status...");

    if (!isSupabaseConfigured()) {
      log.warn("Supabase not configured - redirecting to home");
      addToast("Please configure Supabase first", "warning");
      navigate("/");
      return;
    }

    try {
      log.api("Calling supabase.auth.getUser()");
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        log.error("Auth check failed", error);
        addToast("Session expired. Please sign in again.", "warning");
        navigate("/login");
        return;
      }

      if (!data.user) {
        log.warn("No authenticated user found");
        addToast("Please sign in to access the dashboard", "info");
        navigate("/login");
        return;
      }

      log.success(`User authenticated: ${data.user.email}`);
      setUser(data.user);
    } catch (err) {
      log.error("Unexpected error checking auth", err);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    log.auth("Signing out...");
    addToast("Signing out...", "info", 2000);

    try {
      log.api("Calling supabase.auth.signOut()");
      const { error } = await supabase.auth.signOut();

      if (error) {
        log.error("Sign out failed", error);
        addToast(error.message, "error");
        return;
      }

      log.success("Signed out successfully");
      addToast("You've been signed out", "success");
      navigate("/");
    } catch (err) {
      log.error("Unexpected error during sign out", err);
      addToast("Something went wrong", "error");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <span className="text-3xl text-white font-bold">
                {user?.email?.charAt(0).toUpperCase() || "?"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Members Dashboard
              </h2>
              <p className="text-gray-600 mb-1">Welcome back!</p>
              <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-4 mb-6"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-2">Account Info</h3>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">User ID</dt>
                  <dd className="text-gray-900 font-mono text-xs">
                    {user?.id.slice(0, 8)}...
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Created</dt>
                  <dd className="text-gray-900">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Last Sign In</dt>
                  <dd className="text-gray-900">
                    {user?.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString()
                      : "N/A"}
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                onClick={handleSignOut}
                variant="outline"
                fullWidth
                isLoading={isSigningOut}
              >
                Sign Out
              </Button>
              <Link to="/" className="block">
                <Button variant="ghost" fullWidth>
                  ← Back to Home
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          You&apos;re viewing the protected members area
        </motion.p>
      </motion.div>
    </div>
  );
}
