import React, { useState } from "react"

export default function Component() {
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
                <button
                  className="inline-flex items-center justify-center rounded-md border border-[#dee2e6] bg-white px-4 py-2 text-sm font-medium text-[#495057] shadow-sm transition-colors hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#6c757d] focus:ring-offset-2"
                  onClick={handleSaveName}
                >
                  Save
                </button>
              ) : (
                <button
                  className="inline-flex items-center justify-center rounded-md border border-[#dee2e6] bg-white px-4 py-2 text-sm font-medium text-[#495057] shadow-sm transition-colors hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#6c757d] focus:ring-offset-2"
                  onClick={handleEditName}
                >
                  Edit Name
                </button>
              )}
              <button
                className="inline-flex items-center justify-center rounded-md border border-[#dee2e6] bg-white px-4 py-2 text-sm font-medium text-[#495057] shadow-sm transition-colors hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#6c757d] focus:ring-offset-2"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="block text-sm font-medium text-[#495057]">
                Name
              </label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="block w-full rounded-md border border-[#dee2e6] px-3 py-2 text-[#495057] shadow-sm focus:border-[#80bdff] focus:ring-[#80bdff]"
                />
              ) : (
                <input
                  id="name"
                  type="text"
                  value={name}
                  disabled
                  className="block w-full rounded-md border border-[#dee2e6] px-3 py-2 text-[#495057] shadow-sm focus:border-[#80bdff] focus:ring-[#80bdff]"
                />
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#495057]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="block w-full rounded-md border border-[#dee2e6] px-3 py-2 text-[#495057] shadow-sm focus:border-[#80bdff] focus:ring-[#80bdff]"
              />
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
                <label htmlFor="current-password" className="block text-sm font-medium text-[#495057]">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-md border border-[#dee2e6] px-3 py-2 text-[#495057] shadow-sm focus:border-[#80bdff] focus:ring-[#80bdff]"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="new-password" className="block text-sm font-medium text-[#495057]">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border border-[#dee2e6] px-3 py-2 text-[#495057] shadow-sm focus:border-[#80bdff] focus:ring-[#80bdff]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                className="inline-flex items-center justify-center rounded-md border border-[#dee2e6] bg-white px-4 py-2 text-sm font-medium text-[#495057] shadow-sm transition-colors hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#6c757d] focus:ring-offset-2"
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md bg-[#0c0c0c] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1f1f20] focus:outline-none focus:ring-2 focus:ring-[#373a3d] focus:ring-offset-2"
                onClick={handleSavePassword}
              >
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
