"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Settings, List, Clock, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Services", href: "/dashboard/services", icon: List },
  { name: "Availability", href: "/dashboard/availability", icon: Clock },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-background">
      <div className="p-6">
        <h1 className="text-xl font-bold">BookFlow</h1>
        <p className="text-sm text-muted-foreground">Professional Dashboard</p>
      </div>
      <nav className="space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
