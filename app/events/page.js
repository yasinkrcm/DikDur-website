import { Calendar, Clock, Users, Video, MapPin, Star } from "lucide-react"
import Card from "@/components/Card"

export default function EventsPage() {
  const upcomingWebinars = [
    {
      id: 1,
      title: "Desk Ergonomics: Setting Up Your Perfect Workspace",
      presenter: "Dr. Sarah Johnson",
      date: "2024-01-25",
      time: "2:00 PM - 3:00 PM EST",
      attendees: 45,
      maxAttendees: 100,
      type: "webinar",
      description: "Learn how to optimize your workspace for better posture and reduced strain.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Stress Management in the Modern Workplace",
      presenter: "Dr. Michael Chen",
      date: "2024-01-27",
      time: "1:00 PM - 2:30 PM EST",
      attendees: 67,
      maxAttendees: 150,
      type: "webinar",
      description: "Practical techniques for managing workplace stress and improving mental health.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Movement Breaks: Energizing Your Workday",
      presenter: "Dr. Emily Rodriguez",
      date: "2024-01-30",
      time: "12:00 PM - 1:00 PM EST",
      attendees: 23,
      maxAttendees: 75,
      type: "workshop",
      description: "Interactive session on incorporating movement into your daily work routine.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const groupSessions = [
    {
      id: 1,
      title: "Morning Stretch & Mobility",
      instructor: "Lisa Park",
      date: "2024-01-24",
      time: "8:00 AM - 8:30 AM",
      location: "Conference Room A",
      participants: 12,
      maxParticipants: 15,
      difficulty: "Beginner",
      recurring: "Daily",
    },
    {
      id: 2,
      title: "Lunchtime Yoga Flow",
      instructor: "James Wilson",
      date: "2024-01-24",
      time: "12:30 PM - 1:15 PM",
      location: "Wellness Room",
      participants: 8,
      maxParticipants: 20,
      difficulty: "All Levels",
      recurring: "Mon, Wed, Fri",
    },
    {
      id: 3,
      title: "Posture Correction Workshop",
      instructor: "Dr. Sarah Johnson",
      date: "2024-01-26",
      time: "3:00 PM - 4:00 PM",
      location: "Training Room B",
      participants: 6,
      maxParticipants: 12,
      difficulty: "Intermediate",
      recurring: "Weekly",
    },
    {
      id: 4,
      title: "Breathing & Relaxation",
      instructor: "Maria Garcia",
      date: "2024-01-25",
      time: "5:00 PM - 5:30 PM",
      location: "Quiet Room",
      participants: 15,
      maxParticipants: 25,
      difficulty: "Beginner",
      recurring: "Tue, Thu",
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Events & Sessions</h1>
          <p className="text-gray-600">Join webinars, workshops, and group wellness sessions</p>
        </div>

        {/* Upcoming Webinars */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWebinars.map((webinar) => (
              <Card key={webinar.id}>
                <div className="relative mb-4">
                  <img
                    src={webinar.image || "/placeholder.svg"}
                    alt={webinar.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        webinar.type === "webinar" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {webinar.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{webinar.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Presented by {webinar.presenter}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(webinar.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{webinar.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {webinar.attendees}/{webinar.maxAttendees} registered
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(webinar.attendees / webinar.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Register Now</span>
                </button>
              </Card>
            ))}
          </div>
        </section>

        {/* Group Sessions Calendar */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Wellness Sessions</h2>

          {/* Calendar View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <button className="btn-primary">List View</button>
              <button className="btn-secondary">Calendar View</button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Sessions</option>
                <option>Today</option>
                <option>This Week</option>
                <option>Beginner Friendly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupSessions.map((session) => (
              <Card key={session.id}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(session.difficulty)}`}
                  >
                    {session.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Led by {session.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(session.date).toLocaleDateString()} • {session.recurring}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {session.participants}/{session.maxParticipants} participants
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary">Join Session</button>
                  <button className="btn-secondary">Add to Calendar</button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
