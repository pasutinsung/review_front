"use client";

import React, { useState } from "react";
import axios from "axios";

const FormPage: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [sentiment, setSentiment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/analyze", {
        params: {
          text: text,
        },
      });
      setSentiment(response.data.sentiment);
      setError(null);
    } catch (error) {
      setError("Error occurred while fetching sentiment.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="textInput"
            style={{ display: "block", marginBottom: "1.0rem" }}
          >
            วิเคราห์ความรู้สึกคุณต่อสินค้าเรา:
            <input
              id="textInput"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                height: "2.5rem",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#3490dc",
            color: "#fff",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "1rem", color: "#ff0000" }}>
          Error: {error}
        </div>
      )}
      {sentiment && (
        <div style={{ marginTop: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Sentiment</h2>
          <p>Score: {sentiment.score}</p>
          <p>Polarity: {sentiment.polarity}</p>
        </div>
      )}
    </div>
  );
};

export default FormPage;
