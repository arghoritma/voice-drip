import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <div className="mt-4">
          <h2 className="text-4xl font-bold text-base-content">Oops!</h2>
          <p className="text-xl text-base-content/70 mt-2">Page not found</p>
        </div>
        <div className="mt-8">
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
