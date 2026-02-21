"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User } from "lucide-react"
import logo from "@/components/images/logo.jpeg"
import { useEffect, useState, useRef } from "react"


import {
  
  Package,
  MapPin,
  Heart,
  CreditCard,
  FileText,
  Gift,
  Info,
  Shield,
  LogOut
} from "lucide-react"

export default function MainHeader() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check user
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])


    console.log("User current data ",user);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleUserClick = () => {
    if (!user) {
      setShowLogin(true)
    } else {
      setOpen(!open)
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout")
    window.location.reload()
  }

  return (
    <>
     <header className="bg-white shadow-sm border-b relative z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="Virasat Organics" width={50} height={50} className="rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-green-700">Virasat</h1>
              <p className="text-xs text-gray-500">Organics</p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 mx-10">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search organic products..."
                className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button className="bg-green-600 px-4 rounded-r-md text-white hover:bg-green-700">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-gray-700 relative" ref={dropdownRef}>
            <button onClick={handleUserClick}>
              <User className="cursor-pointer hover:text-green-600" />
            </button>

            <ShoppingCart className="cursor-pointer hover:text-green-600" />

            {/* Profile Dropdown */}
           {user && open && (
  <div className="absolute right-0 top-full mt-3 w-80 
bg-white rounded-2xl shadow-2xl border 
z-[999] max-h-[85vh] overflow-y-auto">

    {/* HEADER */}
   {/* HEADER */}
<div className="px-5 py-4 border-b bg-gradient-to-br from-green-50 to-white">

  {/* Logged In */}
  <div className="mb-3">
    <p className="text-xs text-gray-500 uppercase tracking-wide">
      Logged in as
    </p>
    <p className="font-semibold text-gray-900 truncate">
      {user?.mobile || user?.email}
    </p>
  </div>

  {/* Location Card */}
  <div className="bg-white border rounded-xl p-3 shadow-sm">
    <div className="flex items-start gap-3">

      <MapPin size={18} className="text-green-600 mt-1" />

      <div className="flex-1">
        <p className="text-xs text-gray-500">
          Delivering to
        </p>
        <p className="text-sm font-medium text-gray-800 leading-snug">
          Sector 6, Gomti Nagar Extension,
          Lucknow
        </p>
      </div>

      <Link
        href="/address"
        className="text-xs text-green-600 font-semibold hover:underline"
      >
        Change
      </Link>

    </div>
  </div>

</div>
    <div className="py-2">

      {/* ACCOUNT SECTION */}
      <p className="px-5 pt-3 pb-2 text-xs text-gray-400 uppercase tracking-wide">
        Account
      </p>

      <MenuItem icon={<User size={18} />} label="Profile" href="/profile" />
      <MenuItem icon={<Package size={18} />} label="Your Orders" href="/orders" />
      <MenuItem icon={<MapPin size={18} />} label="Address Book" href="/address" />
      <MenuItem icon={<Heart size={18} />} label="Wishlist" href="/wishlist" />

      <Divider />

      {/* BILLING SECTION */}
      <p className="px-5 pt-3 pb-2 text-xs text-gray-400 uppercase tracking-wide">
        Billing & Business
      </p>

      <MenuItem icon={<CreditCard size={18} />} label="Payment History" href="/payments" />
      <MenuItem icon={<FileText size={18} />} label="GST Details" href="/gst" />

      <Divider />

      {/* EXPLORE SECTION */}
      <p className="px-5 pt-3 pb-2 text-xs text-gray-400 uppercase tracking-wide">
        Explore
      </p>

      <MenuItem icon={<Gift size={18} />} label="Refer & Earn" href="/refer" />
      <MenuItem icon={<Info size={18} />} label="About Us" href="/about" />
      <MenuItem icon={<Shield size={18} />} label="Privacy Policy" href="/privacy" />

      <Divider />

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  </div>
)}
          </div>

        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Login</h2>

            <Link
              href="/auth/login"
              className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
              onClick={() => setShowLogin(false)}
            >
              Go to Login Page
            </Link>
          </div>
        </div>
      )}
    </>
  )


  function MenuItem({ icon, label, href }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  )
}

function Divider() {
  return <div className="my-2 border-t" />
}
}