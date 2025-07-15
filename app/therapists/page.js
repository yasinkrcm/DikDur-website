import { MapPin, Star, Clock, Phone, Calendar } from "lucide-react"
import Card from "@/components/Card"

export default function TherapistsPage() {
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Musculoskeletal Physiotherapy",
      rating: 4.9,
      reviews: 127,
      distance: "2.3 km",
      availability: "Available Today",
      image: "/placeholder.svg?height=80&width=80",
      experience: "8 years",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Sports Rehabilitation",
      rating: 4.8,
      reviews: 94,
      distance: "3.1 km",
      availability: "Next Available: Tomorrow",
      image: "/placeholder.svg?height=80&width=80",
      experience: "12 years",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Workplace Ergonomics",
      rating: 4.9,
      reviews: 156,
      distance: "1.8 km",
      availability: "Available Today",
      image: "/placeholder.svg?height=80&width=80",
      experience: "6 years",
      languages: ["English", "Spanish", "French"],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Chronic Pain Management",
      rating: 4.7,
      reviews: 89,
      distance: "4.2 km",
      availability: "Next Available: Friday",
      image: "/placeholder.svg?height=80&width=80",
      experience: "15 years",
      languages: ["English"],
    },
  ]

  const specialties = [
    "All Specialties",
    "Musculoskeletal",
    "Sports Rehabilitation",
    "Workplace Ergonomics",
    "Chronic Pain",
    "Post-Injury Recovery",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 py-8">
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
              {therapists.map((therapist) => (
                <Card key={therapist.id} className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl hover:shadow-2xl hover:border-blue-medium/70 transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={therapist.image || "/placeholder.svg"}
                        alt={therapist.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-light/50 shadow-lg"
                      />
                    </div>

                    {/* Therapist Info */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-dark mb-2">{therapist.name}</h3>
                          <p className="text-blue-medium font-semibold mb-3 text-lg">{therapist.specialty}</p>

                          <div className="flex items-center space-x-6 text-sm text-blue-dark/80 mb-3">
                            <div className="flex items-center space-x-2">
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <span className="font-semibold text-blue-dark">{therapist.rating}</span>
                              <span>({therapist.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-5 w-5 text-blue-medium" />
                              <span className="font-medium">{therapist.distance} away</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-blue-dark/80">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-5 w-5 text-blue-medium" />
                              <span className="font-medium">{therapist.experience} experience</span>
                            </div>
                            <span className="font-medium">Languages: {therapist.languages.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-3 md:items-end">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                              therapist.availability.includes("Available Today")
                                ? "bg-green-100 text-green-800 border-2 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-2 border-yellow-200"
                            }`}
                          >
                            {therapist.availability}
                          </span>

                          <div className="flex space-x-3">
                            <button className="btn-secondary flex items-center space-x-2">
                              <Phone className="h-5 w-5" />
                              <span>Call</span>
                            </button>
                            <button className="btn-primary flex items-center space-x-2">
                              <Calendar className="h-5 w-5" />
                              <span>Book</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="btn-secondary hover:bg-blue-light/20 border-blue-medium">Load More Therapists</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
