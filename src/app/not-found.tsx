// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
