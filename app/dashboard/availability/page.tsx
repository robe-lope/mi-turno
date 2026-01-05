"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { mockWorkingHours } from "@/lib/mock-data"
import type { WorkingHours } from "@/types"
import { Plus, Trash2 } from "lucide-react"

export default function AvailabilityPage() {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>(mockWorkingHours)
  const [exceptions, setExceptions] = useState<{ date: string; reason: string }[]>([])

  const toggleDay = (day: string) => {
    setWorkingHours(workingHours.map((wh) => (wh.day === day ? { ...wh, enabled: !wh.enabled } : wh)))
  }

  const updateTime = (day: string, field: "startTime" | "endTime", value: string) => {
    setWorkingHours(workingHours.map((wh) => (wh.day === day ? { ...wh, [field]: value } : wh)))
  }

  const addException = () => {
    setExceptions([...exceptions, { date: "", reason: "" }])
  }

  const removeException = (index: number) => {
    setExceptions(exceptions.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Availability</h1>
        <p className="text-muted-foreground">Set your working hours and manage exceptions</p>
      </div>

      {/* Weekly Hours */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Working Hours</h2>
        <div className="space-y-4">
          {workingHours.map((wh) => (
            <div key={wh.day} className="flex items-center gap-4">
              <div className="w-32">
                <div className="flex items-center gap-2">
                  <Switch checked={wh.enabled} onCheckedChange={() => toggleDay(wh.day)} />
                  <Label className="cursor-pointer" onClick={() => toggleDay(wh.day)}>
                    {wh.day}
                  </Label>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="time"
                  value={wh.startTime}
                  onChange={(e) => updateTime(wh.day, "startTime", e.target.value)}
                  disabled={!wh.enabled}
                  className="w-32"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={wh.endTime}
                  onChange={(e) => updateTime(wh.day, "endTime", e.target.value)}
                  disabled={!wh.enabled}
                  className="w-32"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Date Exceptions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Date Exceptions</h2>
          <Button variant="outline" size="sm" onClick={addException} className="gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            Add Exception
          </Button>
        </div>

        {exceptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exceptions set. Add dates when you're unavailable.</p>
        ) : (
          <div className="space-y-3">
            {exceptions.map((exception, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  type="date"
                  value={exception.date}
                  onChange={(e) => {
                    const newExceptions = [...exceptions]
                    newExceptions[index].date = e.target.value
                    setExceptions(newExceptions)
                  }}
                  className="w-48"
                />
                <Input
                  value={exception.reason}
                  onChange={(e) => {
                    const newExceptions = [...exceptions]
                    newExceptions[index].reason = e.target.value
                    setExceptions(newExceptions)
                  }}
                  placeholder="Reason (optional)"
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={() => removeException(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  )
}
