import React from "react";

const ALUHeader: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 px-6 shadow-lg">
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 transform rotate-0 animate-pulse"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>

        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">
            ALUtron <span className="text-yellow-300"></span>
          </h1>
          <div className="h-1 w-24 bg-yellow-300 rounded mt-1"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ALUHeader;
