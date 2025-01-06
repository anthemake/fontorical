"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [deletionStatus, setDeletionStatus] = useState('');

  const handleDeleteData = async () => {
    const response = await fetch('/api/delete', { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      setDeletionStatus('Your data has been successfully deleted.');
    } else {
      setDeletionStatus('Failed to delete your data. Please try again later.');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl mb-6">Account Settings</h1>
      <button 
        onClick={handleDeleteData}
        className="bg-red-500 text-white p-4 rounded"
      >
        Delete My Data
      </button>
      {deletionStatus && <p className="mt-4">{deletionStatus}</p>}
    </main>
  );
}
