import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });
  // Statik örnek veri
  return Response.json([
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
  ]);
} 