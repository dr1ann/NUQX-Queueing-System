import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-8xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-4xl font-semibold mb-2">Access Denied</h2>
      <p className="mb-6 text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-[#35408e] text-white px-4 py-2 rounded transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ForbiddenPage;
