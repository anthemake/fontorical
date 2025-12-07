"use client";

import { useEffect, useState } from 'react';

export default function FadeInComponent({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${isVisible ? 'fade-enter-active' : 'fade-enter'}`}>
      {children}
    </div>
  );
}
