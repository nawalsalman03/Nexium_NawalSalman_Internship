'use client';

import React, { useState } from "react";

type AISummary = {
  summary: string;
  confidence: string;
  insights: string[];
};

export default function HomePage() {
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);

  const testFakeAI = async () => {
    setLoading(true);
    const res = await fetch("/api/tailor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobTitle: "Product Manager" }),
    });

    const json = await res.json();
    setSummary(json.data);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Fake AI Summary Tester</h1>

      <button
        onClick={testFakeAI}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Loading..." : "Get Summary"}
      </button>

      {summary && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p><strong>Summary:</strong> {summary.summary}</p>
          <p><strong>Confidence:</strong> {summary.confidence}</p>
          <ul>
            {summary.insights.map((point, idx) => (
              <li key={idx}>🔹 {point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
