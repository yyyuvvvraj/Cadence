import React, { useState } from "react";
import {
  onKeyDown,
  onKeyUp,
  getKeystrokeData,
} from "../utils/keystrokeTracker";
import "./TypingTest.css";

export default function TypingTest() {
  const [mode, setMode] = useState("verify");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const data = getKeystrokeData();

    const endpoint =
      mode === "enroll"
        ? "http://localhost:5000/api/enroll"
        : "http://localhost:5000/api/verify";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_1",
          ...data,
        }),
      });

      const result = await res.json();

      if (mode === "verify") {
        alert(result.verified ? "✅ Verified user" : "❌ Verification failed");
      } else {
        alert("✅ Enrollment successful");
      }
    } catch (err) {
      alert("❌ Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="typing-container">
      <h3 className="typing-title">Behavioral Typing Verification</h3>

      <select
        className="typing-select"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="verify">Verify</option>
        <option value="enroll">Enroll</option>
      </select>

      <textarea
        className="typing-textarea"
        placeholder="Type naturally here..."
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />

      <button
        className="typing-button"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Processing..." : mode === "verify" ? "Verify" : "Enroll"}
      </button>
    </div>
  );
}
