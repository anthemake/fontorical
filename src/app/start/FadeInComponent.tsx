"use client";

import { useEffect, useState } from 'react';

export default function FadeInComponent({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade-in effect when component mounts
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to ensure smooth transition from black
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${isVisible ? 'fade-enter-active' : 'fade-enter'}`}>
      {children}
    </div>
  );
}
