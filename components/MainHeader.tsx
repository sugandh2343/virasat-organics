"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import logo from "@/components/images/logo.jpeg"
import { ShoppingCart, User } from "lucide-react"
import LoginModal from "./LoginModal"

export default function MainHeader() {
  const [openLogin, setOpenLogin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Check login
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
    <>
      {/* Top Bar */}
      <div className="bg-[#198754] text-white text-center text-sm py-1">
        Free Shipping on Orders above ₹750
      </div>

      {/* Main Header */}
      <div className="bg-[#0F5132] px-6 py-4 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Search */}
          <div className="w-1/3">
            <div className="flex">
              <input
                placeholder="Search organic products..."
                className="w-full px-4 py-2 rounded-l bg-white outline-none"
              />
              <button className="bg-[#198754] px-4 rounded-r text-white">
                🔍
              </button>
            </div>
          </div>

          {/* Logo */}
          <div className="w-1/3 flex justify-center">
            <Image src={logo} alt="Virasat" width={140} height={50} />
          </div>

          {/* Right Section */}
          <div className="w-1/3 flex justify-end items-center gap-6 text-white relative">

            {/* User Section */}
            {!user ? (
              <button onClick={() => setOpenLogin(true)}>
                <User size={24} />
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 bg-[#198754] rounded-full flex items-center justify-center font-bold"
                >
                  {user.mobile?.slice(-2)}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                    <a className="block px-4 py-2 hover:bg-gray-100" href="/profile">
                      Profile
                    </a>
                    <a className="block px-4 py-2 hover:bg-gray-100" href="/orders">
                      Order History
                    </a>
                    <a className="block px-4 py-2 hover:bg-gray-100" href="/addresses">
                      My Addresses
                    </a>
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

            {/* Cart */}
            <button>
              <ShoppingCart size={24} />
            </button>

          </div>
        </div>
      </div>

      {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
    </>
  )
}
