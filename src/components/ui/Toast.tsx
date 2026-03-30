"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Visual config                                                      */
/* ------------------------------------------------------------------ */

const typeConfig: Record<
  ToastType,
  { icon: React.ReactNode; accent: string; bg: string }
> = {
  success: {
    icon: <Check className="h-4 w-4" />,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  error: {
    icon: <AlertCircle className="h-4 w-4" />,
    accent: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    accent: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    accent: "text-[var(--color-accent,#8B5CF6)]",
    bg: "bg-[var(--color-accent,#8B5CF6)]/10 border-[var(--color-accent,#8B5CF6)]/20",
  },
};

const progressAccent: Record<ToastType, string> = {
  success: "bg-emerald-400",
  error: "bg-red-400",
  warning: "bg-amber-400",
  info: "bg-[var(--color-accent,#8B5CF6)]",
};

/* ------------------------------------------------------------------ */
/*  Single toast                                                       */
/* ------------------------------------------------------------------ */

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const duration = toast.duration ?? 5000;
  const [progress, setProgress] = useState(100);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        onDismiss(toast.id);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onDismiss, toast.id]);

  const cfg = typeConfig[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "relative w-80 overflow-hidden rounded-xl border backdrop-blur-xl",
        "shadow-2xl shadow-black/40",
        cfg.bg
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <span className={cn("mt-0.5 shrink-0", cfg.accent)}>{cfg.icon}</span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-xs text-white/50">{toast.description}</p>
          )}
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 p-1 rounded text-white/30 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full bg-white/5">
        <div
          className={cn("h-full transition-none", progressAccent[toast.type])}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 10);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[110] flex flex-col-reverse gap-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastCard key={t.id} toast={t} onDismiss={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export { ToastCard };
