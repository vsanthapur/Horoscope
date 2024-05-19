"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Invalid() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const router = useRouter();

  const Return = () => {
    router.push('/');
  };  

  return (
    
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover' }}
      >
      <div className="bg-slate-300 p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Date!</h1>
        <p className="text-2xl font-bold mb-4">{message}</p>
        <button
          onClick={Return}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
