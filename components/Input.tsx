"use client";

import { useState } from "react";

export default function InterviewForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [candidateResponses, setCandidateResponses] = useState<string[]>([""]);

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...candidateResponses];
    newResponses[index] = value;
    setCandidateResponses(newResponses);
  };

  const handleAddResponse = () => {
    setCandidateResponses([...candidateResponses, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      jobDescription,
      candidateResponses,
    };

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Evaluation:", result.evaluation);
    } catch (error) {
      console.error("Error submitting interview:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Job Interview Evaluation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description"
            rows={5}
            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
          />
        </div>

        {candidateResponses.map((response, index) => (
          <div key={index}>
            <label htmlFor={`response-${index}`}>Candidate Response {index + 1}:</label>
            <textarea
              id={`response-${index}`}
              value={response}
              onChange={(e) => handleResponseChange(index, e.target.value)}
              placeholder="Enter candidate's response"
              rows={5}
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddResponse}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Response
        </button>

        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Evaluate Candidate
        </button>
      </form>
    </div>
  );
}
