"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import logo from "@/components/images/logo.jpeg"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout")
    window.location.reload()
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Virasat" width={140} height={40} />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <Link href="/auth/login" className="px-4 py-2 border rounded">
                Login
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-green-600 text-white rounded">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* User Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold"
              >
                {user.mobile?.slice(-2)}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Order History
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
