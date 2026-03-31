import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/Card";
import { Button } from "~/components/Button";
import { ConfigWarning } from "~/components/ConfigWarning";
import { isSupabaseConfigured } from "~/lib/supabase";
import { log } from "~/lib/logger";
import { useEffect, useState } from "react";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    log.ui("Home page mounted");
    const configured = isSupabaseConfigured();
    setShowWarning(!configured);
    if (!configured) {
      log.warn("Supabase not configured - showing setup instructions");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
              <CardTitle>Members Portal</CardTitle>
              <CardDescription>
                Learn Supabase authentication by building a members-only area.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/login">
                <Button fullWidth size="lg">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/signup">
                <Button fullWidth size="lg" variant="secondary">
                  Create Account
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
          Open your browser console to see educational logs
        </motion.p>
      </motion.div>
    </div>
  );
}
