"use client";

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-indigo-700">
      <h1 className="text-5xl font-bold mb-4 text-white">Fontorical</h1>
      
      <div className="flex space-x-4">
        <Link href="/start" className="bg-white text-indigo-600 p-4 rounded shadow-md hover:text-indigo-400">
          Start Game
        </Link>
        <Link href="/about" className="bg-white text-indigo-600 p-4 rounded shadow-md hover:text-indigo-400">
          About
        </Link>
        <Link href="/settings" className="bg-white text-indigo-600 p-4 rounded shadow-md hover:text-indigo-400">
          Settings
        </Link>

    
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-500 text-white p-4 rounded shadow-md hover:bg-red-400"
          >
            Log Out
          </button>
        )}
      </div>
    </main>
  );
}
