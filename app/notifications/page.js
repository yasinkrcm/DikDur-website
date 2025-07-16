"use client";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications/reminder")
      .then((res) => res.json())
      .then((data) => {
        setReminders(data.reminders || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-dark">Reminders & Notifications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : reminders.length === 0 ? (
        <p>No reminders found.</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((rem, i) => (
            <li key={i} className="p-4 bg-orange-100/30 rounded-xl border border-orange-200">
              <span className="font-semibold text-orange-700">{rem.title}</span>
              <p className="text-orange-700/80 mt-1">{rem.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 