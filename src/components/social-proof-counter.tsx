"use client";

import { useState, useEffect } from "react";

export function SocialProofCounter() {
  const [count, setCount] = useState(87); // Starting count

  useEffect(() => {
    // Load count from localStorage if available
    const savedCount = localStorage.getItem("salesCount");
    const savedTimestamp = localStorage.getItem("salesCountTimestamp");
    
    if (savedCount && savedTimestamp) {
      const now = Date.now();
      const lastUpdate = parseInt(savedTimestamp);
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      
      // Reset weekly to keep numbers realistic
      if (now - lastUpdate > weekInMs) {
        const newCount = Math.floor(Math.random() * 21) + 40; // Random 40-60
        setCount(newCount);
        localStorage.setItem("salesCount", newCount.toString());
        localStorage.setItem("salesCountTimestamp", now.toString());
      } else {
        setCount(parseInt(savedCount));
      }
    }

    // Auto-increment randomly every 35-90 minutes
    const randomInterval = () => Math.floor(Math.random() * (90 - 35 + 1) + 35) * 60 * 1000;
    
    const incrementCount = () => {
      setCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("salesCount", newCount.toString());
        return newCount;
      });
      
      // Schedule next increment
      const nextInterval = randomInterval();
      setTimeout(incrementCount, nextInterval);
    };

    // Start increment cycle
    const firstInterval = randomInterval();
    const timer = setTimeout(incrementCount, firstInterval);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      </span>
      <span>
        <span className="font-semibold text-rose-600">{count}</span> copie vendute nelle ultime 48 ore
      </span>
    </div>
  );
}
