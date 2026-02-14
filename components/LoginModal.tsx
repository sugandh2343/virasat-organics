"use client"

import { useState } from "react"
import SignupModal from "./SignupModal"

export default function LoginModal({ onClose }: any) {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [openSignup, setOpenSignup] = useState(false)

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    window.location.reload()
  }

  if (openSignup) {
    return <SignupModal onClose={onClose} />
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[750px] flex overflow-hidden">

        {/* Left */}
        <div className="w-1/2 bg-[#0F5132] text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Virasat Organics</h2>
          <p className="text-center">Pure Organic, Delivered Fresh</p>
        </div>

        {/* Right */}
        <div className="w-1/2 p-8 space-y-4">
          <h3 className="text-xl font-semibold">Login</h3>

          <input
            placeholder="Mobile Number"
            className="border p-3 w-full rounded"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-[#198754] text-white w-full py-3 rounded hover:bg-green-700"
          >
            Login
          </button>

          <p className="text-sm text-center">
            New user?{" "}
            <button
              className="text-[#198754] font-semibold"
              onClick={() => setOpenSignup(true)}
            >
              Sign Up
            </button>
          </p>

          <button
            className="text-xs text-gray-400 absolute top-4 right-6"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
