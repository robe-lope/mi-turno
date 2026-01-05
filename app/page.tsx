import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-semibold text-xl">BookFlow</div>
          <div className="flex items-center gap-4">
            <Link href="/book/stellar-studio">
              <Button variant="ghost" size="sm">
                View Demo Booking
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Seamless booking experience for your business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Transform how clients book your services. A modern, intuitive platform built for professionals who value
            their time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/book/stellar-studio">
              <Button size="lg" className="gap-2">
                Try Demo Booking
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Scheduling</h3>
              <p className="text-muted-foreground">
                Intelligent calendar management that works around your availability
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Updates</h3>
              <p className="text-muted-foreground">Instant notifications and seamless booking confirmations</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Management</h3>
              <p className="text-muted-foreground">Powerful dashboard to manage services, bookings, and availability</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
