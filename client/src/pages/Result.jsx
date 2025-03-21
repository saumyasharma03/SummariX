import React from 'react';
// Create styles if needed

const Result = ({ transcribedText, similarityScore }) => {
  return (
    <div className="result-container">
      <h2>Assessment Result</h2>
      <p><strong>Transcribed Text:</strong> {transcribedText || "N/A"}</p>
      <p><strong>Similarity Score:</strong> {similarityScore ? similarityScore.toFixed(2) : "N/A"}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
};

export default Result;