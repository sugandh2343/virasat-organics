"use client"

import { useState } from "react"

export default function SignupModal({ onClose }: any) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  })

  const signup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Account created. Please login.")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[750px] flex overflow-hidden">

        {/* Left */}
        <div className="w-1/2 bg-[#0F5132] text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Join Virasat</h2>
          <p className="text-center">Start your organic journey today</p>
        </div>

        {/* Right */}
        <div className="w-1/2 p-8 space-y-4">
          <h3 className="text-xl font-semibold">Sign Up</h3>

          <input
            placeholder="Name"
            className="border p-3 w-full rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Mobile Number"
            className="border p-3 w-full rounded"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={signup}
            className="bg-[#198754] text-white w-full py-3 rounded hover:bg-green-700"
          >
            Create Account
          </button>

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
