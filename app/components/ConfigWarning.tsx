import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabaseSetupSteps } from "~/lib/supabase";

interface ConfigWarningProps {
  className?: string;
}

export function ConfigWarning({ className = "" }: ConfigWarningProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            bg-amber-50 border border-amber-200 rounded-xl p-4
            ${className}
          `}
        >
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800">
                Supabase Not Configured
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                Authentication features are disabled. Follow these steps to set up:
              </p>
              <ol className="mt-3 space-y-2">
                {supabaseSetupSteps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm text-amber-700 flex items-start gap-2"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-medium shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
              <div className="mt-4 p-3 bg-amber-100 rounded-lg">
                <p className="text-xs font-mono text-amber-800">
                  # .env file example
                  <br />
                  VITE_SUPABASE_URL=https://your-project.supabase.co
                  <br />
                  VITE_SUPABASE_ANON_KEY=your-anon-key
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-amber-400 hover:text-amber-600 transition-colors"
              aria-label="Dismiss warning"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
