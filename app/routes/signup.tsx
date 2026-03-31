import { Link } from "react-router";
import { useState, type FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/Card";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { ConfigWarning } from "~/components/ConfigWarning";
import { useToast } from "~/components/Toast";
import { supabase, isSupabaseConfigured } from "~/lib/supabase";
import { log } from "~/lib/logger";

function PasswordStrength({ password }: { password: string }) {
  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-lime-400", "bg-green-400"];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`h-1.5 flex-1 rounded-full ${
              i < strength ? colors[strength - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        Password strength: <span className="font-medium">{labels[strength - 1] || "Too short"}</span>
      </p>
    </motion.div>
  );
}

export default function Signup() {
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    log.ui("Signup page mounted");
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    if (!configured) {
      log.warn("Supabase not configured - signup disabled");
    }
  }, []);

  const handleSignup = async (e: FormEvent) => {
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    log.auth(`Attempting signup for: ${email}`);
    addToast("Creating your account...", "info", 2000);

    try {
      log.api("Calling supabase.auth.signUp()");
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        log.error("Signup failed", authError);
        setError(authError.message);
        addToast(authError.message, "error");
        return;
      }

      if (data.user) {
        log.success(`Account created for: ${data.user.email}`);
        log.info("Confirmation email may have been sent (check Supabase settings)");
        setIsSuccess(true);
        addToast("Account created! Check your email.", "success", 6000);
      }
    } catch (err) {
      log.error("Unexpected error during signup", err);
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
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-3xl">✓</span>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We&apos;ve sent a confirmation link to <strong>{email}</strong>
                </p>
                <div className="space-y-3">
                  <Link to="/login">
                    <Button fullWidth>Go to Sign In</Button>
                  </Link>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Use a different email
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form">
                <CardHeader>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                      Sign up to access the members area
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
                        Once you add your environment variables, you&apos;ll be able to
                        create accounts and see the full authentication flow!
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSignup} className="space-y-4">
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
                      className="space-y-2"
                    >
                      <Input
                        label="Password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || !isConfigured}
                        error={error && !password ? "Password is required" : undefined}
                        hint={!password ? "At least 6 characters" : undefined}
                      />
                      <AnimatePresence>
                        {password && <PasswordStrength password={password} />}
                      </AnimatePresence>
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
                        Create Account
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>

                <CardFooter>
                  <p className="text-center text-sm text-gray-600 w-full">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
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
