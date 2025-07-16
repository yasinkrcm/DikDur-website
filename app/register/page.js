"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [available, setAvailable] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return "";
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "therapist_unsigned"); // Cloudinary'de oluşturduğun unsigned preset adı
    console.log("Uploading to Cloudinary:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Cloudinary response:", data);
    return data.secure_url;
  };

  const handleAddAvailable = (date) => {
    if (date && !available.includes(date)) setAvailable([...available, date]);
  };
  const handleRemoveAvailable = (date) => {
    setAvailable(available.filter(d => d !== date));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let uploadedImageUrl = "";
      if (role === "therapist" && imageFile) {
        uploadedImageUrl = await handleImageUpload();
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const endpoint = apiUrl ? `${apiUrl}/api/auth/register` : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, department: role !== "therapist" ? department : undefined, phone, imageUrl: uploadedImageUrl, bio, available, name }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Sunucudan geçersiz yanıt alındı." };
      }
      if (!res.ok) throw new Error(data.message || "Kayıt başarısız");
      // Otomatik login ve yönlendirme:
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 pt-24">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-800">DikDur Kayıt</h2>
        <div>
          <label className="block text-blue-700 mb-1">Ad Soyad</label>
          <input type="text" className="w-full border border-blue-200 rounded-lg px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
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
        {role !== "therapist" && (
          <div>
            <label className="block text-blue-700 mb-1">Departman</label>
            <select
              className="w-full border border-blue-200 rounded-lg px-3 py-2"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              required
            >
              <option value="">Departman Seçiniz</option>
              <option value="Engineering">Mühendislik</option>
              <option value="Marketing">Pazarlama</option>
              <option value="Sales">Satış</option>
              <option value="HR">İK</option>
              <option value="Finance">Finans</option>
            </select>
          </div>
        )}
        {role === "therapist" && (
          <>
            <div>
              <label className="block text-blue-700 mb-1">Telefon</label>
              <input type="tel" className="w-full border border-blue-200 rounded-lg px-3 py-2" value={phone} onChange={e => {
                let val = e.target.value.replace(/\s+/g, "");
                // Sadece başta bir + ve rakamlar
                if (/^\+?\d*$/.test(val)) setPhone(val);
              }} required={role === "therapist"} />
            </div>
            <div>
              <label className="block text-blue-700 mb-1">Profil Fotoğrafı</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required={role === "therapist"} />
            </div>
            <div>
              <label className="block text-blue-700 mb-1">Biyografi</label>
              <textarea className="w-full border border-blue-200 rounded-lg px-3 py-2" value={bio} onChange={e => setBio(e.target.value)} required={role === "therapist"} rows={3} />
            </div>
            <div>
              <label className="block text-blue-700 mb-1">Randevu Saatleri</label>
              <div className="flex gap-2 mb-2">
                <input type="datetime-local" className="border border-blue-200 rounded-lg px-3 py-2" id="available-date-input" />
                <button type="button" className="bg-blue-600 text-white px-3 py-2 rounded-lg" onClick={() => {
                  const input = document.getElementById('available-date-input');
                  if (input && input.value) { handleAddAvailable(input.value); input.value = ""; }
                }}>Ekle</button>
              </div>
              <ul className="mb-2">
                {available.map((date, idx) => (
                  <li key={date} className="flex items-center gap-2 text-sm">
                    <span>{new Date(date).toLocaleString()}</span>
                    <button type="button" className="text-red-600" onClick={() => handleRemoveAvailable(date)}>Kaldır</button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition" disabled={loading}>{loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}</button>
      </form>
    </div>
  );
} 