"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")

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

    router.push("/products")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <input className="border p-2 w-full"
          placeholder="Mobile"
          onChange={e => setMobile(e.target.value)}
        />

        <input type="password" className="border p-2 w-full"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}
