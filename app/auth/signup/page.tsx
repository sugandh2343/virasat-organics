"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

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

    alert("Signup successful")
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-xl font-bold">Sign Up</h1>

        <input className="border p-2 w-full"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input className="border p-2 w-full"
          placeholder="Mobile"
          onChange={e => setForm({ ...form, mobile: e.target.value })}
        />

        <input type="password" className="border p-2 w-full"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={signup}
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
