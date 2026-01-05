import { BookingFlow } from "@/components/booking/booking-flow"
import { mockBusinessInfo } from "@/lib/mock-data"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <BookingFlow business={mockBusinessInfo} />
    </div>
  )
}
