import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { mockBusinessInfo } from "@/lib/mock-data"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your business profile and preferences</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Business Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" defaultValue={mockBusinessInfo.name} placeholder="Your business name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Booking URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">bookflow.com/book/</span>
              <Input id="slug" defaultValue={mockBusinessInfo.slug} placeholder="your-business" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={mockBusinessInfo.description}
              placeholder="Brief description of your business"
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Receive email when a new booking is made</div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">SMS Notifications</div>
              <div className="text-sm text-muted-foreground">Get text messages for booking updates</div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
