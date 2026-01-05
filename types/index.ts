export interface Service {
  id: string
  name: string
  duration: number // in minutes
  price?: number
  description?: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  clientName: string
  clientEmail: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  notes?: string
}

export interface WorkingHours {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

export interface BusinessInfo {
  name: string
  description: string
  slug: string
}
