"use client";
import { useEffect, useState } from "react";

export default function ErgonomicsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/employee/ergonomics")
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.recommendations || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-dark">Ergonomics Recommendations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        <ul className="space-y-4">
          {recommendations.map((rec, i) => (
            <li key={i} className="p-4 bg-blue-light/10 rounded-xl border border-blue-light/30">
              <span className="font-semibold text-blue-dark">{rec.title}</span>
              <p className="text-blue-dark/80 mt-1">{rec.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 