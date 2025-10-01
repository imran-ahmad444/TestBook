import React, { useState } from "react";
import Timer from "./Timer";

const questions = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 3,
    question: "React is developed by?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
  },
];

export default function TestPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qid, ans) => {
    setAnswers({ ...answers, [qid]: ans });
    setReview({ ...review, [qid]: false });
  };

  const markForReview = (qid) => {
    setReview({ ...review, [qid]: true });
  };

  const getStatus = (qid) => {
    if (review[qid]) return "yellow";
    if (answers[qid]) return "green";
    return "red";
  };

  const handleSubmit = () => setSubmitted(true);

  // Summary counts
  const attemptedCount = Object.keys(answers).length;
  const reviewCount = Object.values(review).filter((r) => r).length;
  const notAttemptedCount = questions.length - attemptedCount - reviewCount;

  if (submitted) {
    return (
      <div className="summary-container">
        <h1 className="title">Test Submitted</h1>
        <ul className="summary-list">
          <li>Attempted: <span className="green">{attemptedCount}</span></li>
          <li>Not Attempted: <span className="red">{notAttemptedCount}</span></li>
          <li>Marked for Review: <span className="yellow">{reviewCount}</span></li>
        </ul>
      </div>
    );
  }

  return (
    <div className="test-container">
      {/* Timer */}
      <Timer duration={300} onTimeout={handleSubmit} />

      {/* Question Box */}
      <div className="question-box">
        <h2>
          Q{questions[currentQ].id}. {questions[currentQ].question}
        </h2>
        <div className="options">
          {questions[currentQ].options.map((opt, i) => (
            <div
              key={i}
              className={`option-text ${
                answers[questions[currentQ].id] === opt ? "selected" : ""
              }`}
              onClick={() => handleAnswer(questions[currentQ].id, opt)}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </div>
          ))}
        </div>

        <div className="button-row">
          <button
            onClick={() => markForReview(questions[currentQ].id)}
            className="btn review-btn"
          >
            Mark for Review
          </button>

          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="btn next-btn"
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn submit-btn">
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Palette */}
      <div className="palette">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => setCurrentQ(q.id - 1)}
            className={`palette-btn ${getStatus(q.id)}`}
          >
            {q.id}
          </button>
        ))}
      </div>
    </div>
  );
}
