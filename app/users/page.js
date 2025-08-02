"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/translations";
import { User, Mail, Phone, Building, Briefcase, Calendar, Award, Edit, Save, X } from "lucide-react";

export default function UserProfilePage() {
  const { language } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    position: "", 
    department: "" 
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/users/getUser", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          setMessageType("error");
        } else {
          setUser(data);
          setForm({ 
            name: data.name || "", 
            email: data.email || "", 
            phone: data.phone || "", 
            position: data.position || "", 
            department: data.department || "" 
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setMessage("Kullanıcı bilgileri yüklenirken hata oluştu");
        setMessageType("error");
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
    
    try {
      const res = await fetch("/api/users/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser({ ...user, ...form });
        setEdit(false);
        setMessage(data.message || "Profil başarıyla güncellendi!");
        setMessageType("success");
      } else {
        setMessage(data.message || "Güncelleme başarısız.");
        setMessageType("error");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage("Güncelleme sırasında hata oluştu");
      setMessageType("error");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-dark"></div>
        </div>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Hata</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-2">Profil</h1>
          <p className="text-blue-dark/80 text-lg">Kişisel bilgilerinizi görüntüleyin ve düzenleyin</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === "success" 
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kişisel Bilgiler</h2>
                {!edit && (
                  <button 
                    onClick={() => setEdit(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Düzenle
                  </button>
                )}
              </div>

              {!edit ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Ad Soyad</p>
                      <p className="font-semibold text-gray-900">{user.name || "Belirtilmemiş"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">E-posta</p>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="font-semibold text-gray-900">{user.phone || "Belirtilmemiş"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pozisyon</p>
                      <p className="font-semibold text-gray-900">{user.position || "Belirtilmemiş"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Departman</p>
                      <p className="font-semibold text-gray-900">{user.department || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                    <input 
                      name="email" 
                      type="email"
                      value={form.email} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon</label>
                    <input 
                      name="position" 
                      value={form.position} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departman</label>
                    <input 
                      name="department" 
                      value={form.department} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      type="submit"
                      className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEdit(false)}
                      className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Toplam Puan</p>
                    <p className="font-semibold text-gray-900">{user.totalPoints || 0}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Katılım Tarihi</p>
                    <p className="font-semibold text-gray-900">
                      {user.joinDate ? new Date(user.joinDate).toLocaleDateString('tr-TR') : "Belirtilmemiş"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Rol</p>
                    <p className="font-semibold text-gray-900 capitalize">{user.role || "employee"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 