import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { mockBookings } from "@/lib/mock-data"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const todayBookings = mockBookings.filter((booking) => booking.date === "2026-01-05")

  const stats = [
    { name: "Today's Bookings", value: "2", icon: Calendar, color: "text-blue-600" },
    { name: "This Week", value: "12", icon: Users, color: "text-green-600" },
    { name: "Pending", value: "3", icon: Clock, color: "text-orange-600" },
    { name: "Revenue", value: "$2,450", icon: DollarSign, color: "text-purple-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={cn("w-12 h-12 rounded-lg bg-muted flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Today's Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        {todayBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No bookings scheduled for today</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{booking.time}</span>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                    </div>
                    <p className="text-sm font-medium">{booking.serviceName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.clientName} • {booking.clientEmail}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
