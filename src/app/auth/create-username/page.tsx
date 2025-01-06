"use client";

import { useState } from 'react';

export default function CreateUsername() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('/api/save-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
        credentials: 'include',  // Ensures cookies (including session) are passed with the request
      });

      const data = await response.json();  // Parse the JSON response

      if (response.ok) {
        // Redirect to the game start page after successful creation
        window.location.href = '/start';
      } else {
        setError(data.message);  // Set error message
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6">Create a Username</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 p-2"
          placeholder="Enter your username"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 mt-4 rounded"
          disabled={!username || loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
