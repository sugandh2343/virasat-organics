"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

import { auth } from "@/lib/firebase"


import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"





import Image from "next/image"
import logo from "@/components/images/logo.jpeg"


import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"



declare global {
  interface Window {
    confirmationResult: import("firebase/auth").ConfirmationResult
  }
}

export default function LoginPage() {
  const router = useRouter()

  const [mobile, setMobile] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const[otpVerified,setOtpVerified]=useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  


  // console.log("Firebase auth initialized:", auth)



  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)

    const idToken = await result.user.getIdToken()

    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    })

    if (!res.ok) {
      const data = await res.json()
      alert(data.error)
      return
    }

    router.push("/")

  } catch (error) {
    console.error(error)
    alert("Google login failed")
  }
}

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const sendOtp = async () => {
  if (!mobile) return alert("Enter mobile number")

  try {
    const recaptcha = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    )

    const confirmation = await signInWithPhoneNumber(
      auth,
      "+91" + mobile,
      recaptcha
    )

    window.confirmationResult = confirmation
    setOtpSent(true)

  } catch (error) {
    console.error(error)
    alert("Failed to send OTP")
  }
}


const verifyOtp = async () => {
  const code = otp.join("")

  if (code.length !== 6) {
    return alert("Enter 6 digit OTP")
  }

  try {
    const result = await window.confirmationResult.confirm(code)

    const user = result.user
    const idToken = await user.getIdToken()

    console.log("Firebase ID Token:", idToken)



    handleLogin()

    // Later: send this idToken to backend
    // For now just redirect

    router.push("/")

  } catch (error) {
    console.error(error)
    alert("Invalid OTP")
  }
}

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile,
          password: "temporary_static_password", // keep backend working
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }

      router.push("/products")
    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-white">

        {/* Close Button */}
  <button
    onClick={() => router.push("/")}
    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
  >
    ✕
  </button>
      {/* Left Branding Panel */}
    <div className="hidden md:flex w-1/2 items-center justify-center p-12 bg-white border-r">

  <div className="text-center">

    <div className="flex justify-center mb-8">
      <Image
        src={logo}
        alt="Virasat Organics"
        width={400}
        height={400}
        className=""
      />
    </div>

    <p className="text-2xl font-semibold text-gray-800">
      Welcome Back
    </p>

    <p className="text-sm text-gray-500 mt-3">
      Pure Organic. Delivered Fresh.
    </p>

  </div>

</div>
      {/* Right Form Panel */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Login
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Enter your mobile number to continue
          </p>

          {!otpSent ? (
            <>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-600 outline-none"
              />

              <button
                onClick={() => sendOtp()}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                   className="w-12 h-12 text-center border border-gray-700 rounded-lg text-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                {loading ? "Logging in..." : "Verify & Login"}
              </button>

              <button
                onClick={() => setOtpSent(false)}
                className="text-sm text-green-600 mt-3"
              >
                Change Mobile Number
              </button>
            </>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Google Login Button (UI only for now) */}
          <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          onClick={handleGoogleLogin}>
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6">
            New user?{" "}
            <a href="/auth/signup" className="text-green-600 font-medium">
              Join Us
            </a>
          </p>

        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>

    
  )
  
}