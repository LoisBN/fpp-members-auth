import { Link, useNavigate } from "react-router";
import { useState, type FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/Card";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { ConfigWarning } from "~/components/ConfigWarning";
import { useToast } from "~/components/Toast";
import { supabase, isSupabaseConfigured } from "~/lib/supabase";
import { log } from "~/lib/logger";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    log.ui("Login page mounted");
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    if (!configured) {
      log.warn("Supabase not configured - login disabled");
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isConfigured) {
      addToast("Please configure Supabase first", "warning");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    log.auth(`Attempting login for: ${email}`);
    addToast("Signing in...", "info", 2000);

    try {
      log.api("Calling supabase.auth.signInWithPassword()");
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        log.error("Login failed", authError);
        setError(authError.message);
        addToast(authError.message, "error");
        return;
      }

      if (data.user) {
        log.success(`Login successful for: ${data.user.email}`);
        addToast("Welcome back!", "success");
        log.ui("Navigating to dashboard...");
        navigate("/dashboard");
      }
    } catch (err) {
      log.error("Unexpected error during login", err);
      setError("An unexpected error occurred");
      addToast("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <ConfigWarning />
          </motion.div>
        )}

        <Card>
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            {!isConfigured && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p className="text-sm text-blue-800 font-medium mb-1">
                  🎓 Why are the fields disabled?
                </p>
                <p className="text-sm text-blue-700">
                  The form is disabled because Supabase isn&apos;t configured yet.
                  Once you add your environment variables, the authentication
                  will work and you can sign in!
                </p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || !isConfigured}
                  error={error && !email ? "Email is required" : undefined}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || !isConfigured}
                  error={error && !password ? "Password is required" : undefined}
                />
              </motion.div>

              {error && email && password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <span>✕</span> {error}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                  disabled={!isConfigured}
                >
                  Sign In
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
