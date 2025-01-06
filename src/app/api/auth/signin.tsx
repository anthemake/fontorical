import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6">Sign In</h1>
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </button>
    </main>
  );
}
