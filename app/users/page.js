"use client";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/users/getUser", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setForm({ name: data.name, email: data.email });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    const res = await fetch("/api/users/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setUser({ ...user, ...form });
      setEdit(false);
      setMessage("Profile updated!");
    } else {
      setMessage("Update failed.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto pt-24 pb-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-dark">User Profile</h1>
      {message && <div className="mb-4 text-green-700">{message}</div>}
      {!edit ? (
        <div className="space-y-4">
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <button className="btn-primary mt-4" onClick={() => setEdit(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <button className="btn-primary" type="submit">Save</button>
          <button className="btn-secondary ml-2" type="button" onClick={() => setEdit(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
} 