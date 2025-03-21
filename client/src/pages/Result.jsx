import React from 'react';

const Result = ({ transcribedText, similarityScore, sum_text }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10 mt-10 text-center font-sans">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Assessment Result</h2>
      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        <strong className="text-gray-900">Transcribed Text:</strong> {transcribedText || "N/A"}
      </p>
      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        <strong className="text-gray-900">Summarized Text:</strong> {similarityScore ? sum_text : "N/A"}
      </p>
      <button 
        className="mt-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-purple-800 text-lg font-medium shadow-md transition duration-300"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default Result;