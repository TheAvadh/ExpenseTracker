import React, { useState } from "react"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Input } from "./components/ui/input"

export default function AccountPage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEditName = () => {
    setIsEditing(true)
  }
  const handleSaveName = () => {
    setIsEditing(false)
  }
  const handleChangePassword = () => {
    setIsChangingPassword(true)
  }
  const handleSavePassword = () => {
    setIsChangingPassword(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="col-span-1 grid gap-6 lg:col-span-2 w-full max-w-3xl">
        <div className="text-2xl font-bold mb-4">Hello User 👋</div>
        <div className="rounded-lg border border-[#dee2e6] bg-white p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <Button variant="outline" onClick={handleSaveName}>
                  Save
                </Button>
              ) : (
                <Button variant="outline" onClick={handleEditName}>
                  Edit Name
                </Button>
              )}
              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input id="name" type="text" value={name} onChange={handleNameChange} />
              ) : (
                <Input id="name" type="text" value={name} disabled />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>
          </div>
        </div>
        {isChangingPassword && (
          <div
            className="rounded-lg border border-[#dee2e6] bg-white p-6 shadow animate-slide-up"
            style={{ animation: "slide-up 0.3s ease-in-out" }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePassword}>Save Password</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
