import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type FeedMode = "realtime" | "timeline";

const STORAGE_KEY = "tradeiq-feed-mode";

export function useFeedMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize from URL param, then localStorage, then default
  const getInitialMode = (): FeedMode => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "realtime" || urlMode === "timeline") {
      return urlMode;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "realtime" || stored === "timeline") {
      return stored;
    }
    return "realtime";
  };

  const [mode, setModeState] = useState<FeedMode>(getInitialMode);

  // Sync mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((newMode: FeedMode) => {
    setModeState(newMode);
    // Update URL param
    const newParams = new URLSearchParams(searchParams);
    if (newMode === "realtime") {
      newParams.delete("mode"); // realtime is default, no need for param
    } else {
      newParams.set("mode", newMode);
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return { mode, setMode };
}

// Standalone hook for Dashboard (no URL sync needed)
export function useFeedModeLocal() {
  const getInitialMode = (): FeedMode => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "realtime" || stored === "timeline") {
      return stored;
    }
    return "realtime";
  };

  const [mode, setModeState] = useState<FeedMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // Listen for storage changes from other components
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "realtime" || stored === "timeline") {
        setModeState(stored);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { mode, setMode: setModeState };
}
