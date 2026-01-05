"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockServices, generateTimeSlots } from "@/lib/mock-data"
import type { Service, BusinessInfo } from "@/types"
import { Clock, ArrowLeft, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BookingFlowProps {
  business: BusinessInfo
}

export function BookingFlow({ business }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", notes: "" })

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  const handleBooking = () => {
    console.log("[v0] Booking submitted:", { selectedService, selectedDate, selectedTime, clientInfo })
    setStep(4)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
        <p className="text-muted-foreground">{business.description}</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {step > i ? <Check className="w-4 h-4" /> : i}
            </div>
            {i < 3 && <div className={`w-12 h-0.5 ${step > i ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Select a Service</h2>
          <div className="grid gap-4">
            {mockServices.map((service) => (
              <Card
                key={service.id}
                className={`p-6 cursor-pointer transition-all hover:border-primary ${
                  selectedService?.id === service.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} min</span>
                      </div>
                      {service.price && <Badge variant="secondary">${service.price}</Badge>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(2)} disabled={!selectedService} className="gap-2">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Choose Date & Time</h2>
            <p className="text-muted-foreground mb-6">
              {selectedService?.name} • {selectedService?.duration} minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="space-y-3">
              <Label>Select Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  setSelectedTime("")
                }}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
              <Label>Available Times</Label>
              {!selectedDate ? (
                <div className="text-sm text-muted-foreground py-4">Please select a date first</div>
              ) : (
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="justify-center"
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Client Information */}
      {step === 3 && (
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setStep(2)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
          </div>

          <Card className="p-6 bg-muted/50">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{selectedService?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              {selectedService?.price && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold">${selectedService.price}</span>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={clientInfo.notes}
                onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                placeholder="Any special requests or information..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleBooking} disabled={!clientInfo.name || !clientInfo.email} size="lg">
              Confirm Booking
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center space-y-6 py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground">We've sent a confirmation email to {clientInfo.email}</p>
          </div>
          <Card className="p-6 max-w-md mx-auto text-left">
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Service</div>
                <div className="font-medium">{selectedService?.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Date & Time</div>
                <div className="font-medium">
                  {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Name</div>
                <div className="font-medium">{clientInfo.name}</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
