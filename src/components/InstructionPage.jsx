import React from "react";

export default function InstructionPage({ onStart }) {
  return (
    <div className="instruction-container">
      <h1 className="title">General Instructions</h1>
      <ul className="instruction-list">
        <li>Total Time: 5 minutes</li>
        <li>Each question has 4 options (A, B, C, D)</li>
        <li>You can mark questions for review</li>
        <li>Click Submit when done</li>
      </ul>
      <button onClick={onStart} className="btn start-btn">
        Start Test
      </button>
    </div>
  );
}
