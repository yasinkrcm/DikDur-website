"use client";
import { useEffect, useState } from "react";
import { MapPin, Star, Clock, Phone, Calendar } from "lucide-react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    fetch("/api/therapist/list", { headers: { "Authorization": `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error("Yetkisiz veya hata oluştu");
        try { return await res.json(); } catch { return []; }
      })
      .then((data) => {
        setTherapists(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const specialties = [
    "All Specialties",
    "Musculoskeletal",
    "Sports Rehabilitation",
    "Workplace Ergonomics",
    "Chronic Pain",
    "Post-Injury Recovery",
  ];

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-2">Find Physiotherapists</h1>
          <p className="text-blue-dark/80 text-lg">Connect with certified physiotherapists in your area</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
              <h3 className="text-xl font-bold text-blue-dark mb-6">Filters</h3>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-dark mb-3">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-blue-medium" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-10 pr-4 py-3 border-2 border-blue-light rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-medium focus:border-blue-medium bg-white/90 backdrop-blur-sm transition-all duration-300 text-blue-dark placeholder-blue-medium/60"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-dark mb-3">Specialty</label>
                <select className="w-full px-4 py-3 border-2 border-blue-light rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-medium focus:border-blue-medium bg-white/90 backdrop-blur-sm transition-all duration-300 text-blue-dark font-medium">
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-dark mb-3">Availability</label>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="rounded-lg border-2 border-blue-light text-blue-dark focus:ring-blue-medium focus:ring-2 w-5 h-5 transition-all duration-300" />
                    <span className="ml-3 text-sm text-blue-dark font-medium group-hover:text-blue-medium transition-colors">Available Today</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="rounded-lg border-2 border-blue-light text-blue-dark focus:ring-blue-medium focus:ring-2 w-5 h-5 transition-all duration-300" />
                    <span className="ml-3 text-sm text-blue-dark font-medium group-hover:text-blue-medium transition-colors">Weekend Appointments</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="rounded-lg border-2 border-blue-light text-blue-dark focus:ring-blue-medium focus:ring-2 w-5 h-5 transition-all duration-300" />
                    <span className="ml-3 text-sm text-blue-dark font-medium group-hover:text-blue-medium transition-colors">Evening Hours</span>
                  </label>
                </div>
              </div>

              <button className="w-full btn-primary">Apply Filters</button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Map Placeholder */}
            <Card className="mb-8 bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
              <div className="h-64 bg-gradient-to-br from-blue-light/20 to-blue-medium/30 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-medium mx-auto mb-4" />
                  <p className="text-blue-dark font-semibold text-lg">Interactive Map View</p>
                  <p className="text-blue-dark/70 text-sm">Showing physiotherapists in your area</p>
                </div>
              </div>
            </Card>

            {/* Therapist List */}
            <div className="space-y-6">
              {therapists.map((therapist, index) => (
                <Card key={therapist._id || index} className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl hover:shadow-2xl hover:border-blue-medium/70 transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={therapist.imageUrl || "/placeholder.svg"}
                        alt={therapist.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-light/50 shadow-lg"
                      />
                    </div>
                    {/* Therapist Info */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-dark mb-2">{therapist.name}</h3>
                          <p className="text-blue-medium font-semibold mb-3 text-lg">{therapist.email}</p>
                          <p className="text-gray-700 mb-3">{therapist.bio}</p>
                          <p className="text-gray-700 mb-3">Telefon: {therapist.phone || "-"}</p>
                          <div className="mt-2">
                            <span className="font-medium">Randevu Saatleri: {Array.isArray(therapist.available) && therapist.available.length > 0 ? therapist.available.map(date => new Date(date).toLocaleString()).join(", ") : "Yok"}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-3 md:items-end mt-4 md:mt-0">
                          <button className="btn-secondary flex items-center space-x-2" onClick={() => therapist.phone && window.open(`tel:${therapist.phone}`)} disabled={!therapist.phone}>
                            <Phone className="h-5 w-5" />
                            <span>Call</span>
                          </button>
                          <a
                            href={`https://wa.me/${therapist.phone?.replace(/[^\d]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center space-x-2"
                          >
                            <Calendar className="h-5 w-5" />
                            <span>Book</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
