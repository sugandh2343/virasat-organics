"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import logo from "@/components/images/logo.jpeg"

export default function SignupPage() {
  const router = useRouter()

  const [mobile, setMobile] = useState("")
  const [name, setName] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [step, setStep] = useState<"mobile" | "otp" | "name">("mobile")

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const sendOtp = () => {
    if (!mobile) return alert("Enter mobile number")
    setStep("otp")
  }

  const verifyOtp = () => {
    const fullOtp = otp.join("")
    if (fullOtp.length !== 6) return alert("Enter 6 digit OTP")
    setStep("name")
  }

  const createAccount = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Signup successful")
    router.push("/products")
  }

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT BRANDING */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-12 border-r">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Image
              src={logo}
              alt="Virasat Organics"
              width={200}
              height={200}
              className="rounded-2xl shadow-xl"
            />
          </div>

          <p className="text-2xl font-semibold text-gray-800">
            Join Virasat Family
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Pure Organic. Delivered Fresh.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          {/* Close */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>

          <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-6">
            Create your organic journey
          </p>

          {/* STEP 1 - MOBILE */}
          {step === "mobile" && (
            <>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-600 outline-none mb-4"
              />

              <button
                onClick={sendOtp}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 - OTP */}
          {step === "otp" && (
            <>
              <div className="flex justify-between mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center border border-gray-500 rounded-xl text-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all outline-none"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          {/* STEP 3 - NAME */}
          {step === "name" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-600 outline-none mb-4"
              />

              <button
                onClick={createAccount}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Create Account
              </button>
            </>
          )}


          {/* Divider */}
<div className="flex items-center my-6">
  <div className="flex-1 border-t"></div>
  <span className="px-3 text-gray-400 text-sm">OR</span>
  <div className="flex-1 border-t"></div>
</div>

{/* Google Signup */}
<button
  onClick={() => alert("Google signup will be integrated with Firebase")}
  className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}