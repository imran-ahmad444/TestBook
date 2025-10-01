import React, { useState } from "react";
import InstructionPage from "./components/InstructionPage";
import TestPage from "./components/TestPage";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      {!started ? (
        <InstructionPage onStart={() => setStarted(true)} />
      ) : (
        <TestPage />
      )}
    </div>
  );
}
