import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 border rounded-lg p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="mt-4">
            <h2 className="text-4xl font-bold mb-2">Oops!</h2>
            <p>Page not found</p>
          </div>
          <div className="mt-8">
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
