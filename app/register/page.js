"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.56.1:3000";
      const endpoint = apiUrl ? `${apiUrl}/api/auth/register` : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Sunucudan geçersiz yanıt alındı." };
      }
      if (!res.ok) throw new Error(data.message || "Kayıt başarısız");
      // Eğer backend register sonrası token döndürüyorsa, aşağıdaki satırı açabilirsin:
      // localStorage.setItem("token", data.token);
      // document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-800">DikDur Kayıt</h2>
        <div>
          <label className="block text-blue-700 mb-1">Email</label>
          <input type="email" className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Şifre</label>
          <input type="password" className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Rol</label>
          <select className="w-full border border-blue-200 rounded-lg px-3 py-2" value={role} onChange={e => setRole(e.target.value)}>
            <option value="employee">Çalışan</option>
            <option value="therapist">Terapist</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition" disabled={loading}>{loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}</button>
      </form>
    </div>
  );
} 