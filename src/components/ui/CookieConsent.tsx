'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const COOKIE_KEY = 'aura-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/80 leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic. By
                clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
                <a
                  href="/privacy"
                  className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2.5 text-sm font-bold text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors"
              >
                Accept
              </button>
            </div>
            <button
              onClick={decline}
              className="absolute top-3 right-3 md:hidden p-1 text-white/30 hover:text-white/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
