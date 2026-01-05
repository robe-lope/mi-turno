import type { Service, Booking, WorkingHours, BusinessInfo } from "@/types"

export const mockBusinessInfo: BusinessInfo = {
  name: "Stellar Studio",
  description: "Professional services tailored to your needs. Book your appointment today.",
  slug: "stellar-studio",
}

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Consultation",
    duration: 30,
    price: 50,
    description: "Initial consultation to understand your needs",
  },
  {
    id: "2",
    name: "Standard Session",
    duration: 60,
    price: 100,
    description: "Full service session with comprehensive support",
  },
  {
    id: "3",
    name: "Premium Package",
    duration: 90,
    price: 150,
    description: "Extended session with premium features",
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Consultation",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    date: "2026-01-05",
    time: "10:00",
    status: "confirmed",
    notes: "First time client",
  },
  {
    id: "2",
    serviceId: "2",
    serviceName: "Standard Session",
    clientName: "Michael Chen",
    clientEmail: "michael@example.com",
    date: "2026-01-05",
    time: "14:00",
    status: "pending",
  },
  {
    id: "3",
    serviceId: "3",
    serviceName: "Premium Package",
    clientName: "Emma Davis",
    clientEmail: "emma@example.com",
    date: "2026-01-06",
    time: "09:00",
    status: "confirmed",
  },
]

export const mockWorkingHours: WorkingHours[] = [
  { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Thursday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Friday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Saturday", enabled: false, startTime: "09:00", endTime: "17:00" },
  { day: "Sunday", enabled: false, startTime: "09:00", endTime: "17:00" },
]

export const generateTimeSlots = (date: string) => {
  const slots = []
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  for (const time of hours) {
    slots.push({
      time,
      available: Math.random() > 0.3, // Random availability for demo
    })
  }

  return slots
}
