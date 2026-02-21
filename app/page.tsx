'use client'

import Link from 'next/link'
import Image from 'next/image'

import logo from '@/components/images/logo.jpeg'
import Navbar from "@/components/Navbar"

import MainHeader from "@/components/MainHeader"
import HeroSlider from "@/components/HeroSlider"

import NavMenu from "@/components/NavMenu"
import HomeProducts from '@/components/HomeProducts'

import CategoryRibbon from '@/components/CategoryRibbon'
import { useState } from 'react'

export default function HomePage() {



  const[showDistributorForm,setShowDistributorForm]= useState(false);

  const handleDistributorSubmit = async (e: any) => {
  e.preventDefault()

  const formData = new FormData(e.target)

  const payload = {
    name: formData.get("name"),
    business_name: formData.get("business_name"),
    mobile: formData.get("mobile"),
    email: formData.get("email"),
    city: formData.get("city"),
    message: formData.get("message"),
  }



  console.log("Distributor data before being sent",JSON.stringify(payload))

  await fetch("/api/distributor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  alert("Thank you! Our team will contact you soon.")
  setShowDistributorForm(false)
}
  return (
    <main className="bg-white">
      {/* Navigation */}
      <main>
     <MainHeader />
      <NavMenu />
      <HeroSlider />
      <CategoryRibbon />
      <HomeProducts/>
    </main>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 py-24 relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 text-center space-y-8">

    {/* Tag */}
    <div className="inline-block px-5 py-2 bg-green-100 rounded-full text-green-700 font-medium">
      Limited Early Bird Opportunity – 30 Days Only
    </div>

    {/* Heading */}
    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
      Become an Early Distributor of{" "}
      <span className="text-green-600">Virasat Organics</span>
    </h2>

    {/* Description */}
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
      Manufacturing begins soon. We are onboarding exclusive distributors 
      city-wise before launch. Secure your territory and enjoy priority 
      margins, branding support, and launch visibility.
    </p>

    {/* Benefits */}
    <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Higher Margins</h4>
        <p className="text-sm text-gray-600">
          Early partners receive premium margin slabs and bonus incentives.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">City Exclusivity</h4>
        <p className="text-sm text-gray-600">
          Limited distributor per region for long-term growth protection.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Marketing Support</h4>
        <p className="text-sm text-gray-600">
          Brand launch campaigns, POS materials, and digital promotion.
        </p>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-10">
      <button
        onClick={() => setShowDistributorForm(true)}
        className="px-10 py-4 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition shadow-lg"
      >
        Request Distributorship Now
      </button>
    </div>

  </div>
</section>

{showDistributorForm && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative shadow-2xl">

      <button
        onClick={() => setShowDistributorForm(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
      >
        ✕
      </button>

      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Distributor Enquiry
      </h3>

      <form onSubmit={handleDistributorSubmit} className="space-y-4">

  <input
    name="name"
    required
    placeholder="Full Name"
    className="w-full border p-3 rounded"
  />

  <input
    name="business_name"
    required
    placeholder="Business Name"
    className="w-full border p-3 rounded"
  />

  <input
    name="mobile"
    required
    type="tel"
    placeholder="Mobile Number"
    className="w-full border p-3 rounded"
  />

  <input
    name="email"
    required
    type="email"
    placeholder="Email Address"
    className="w-full border p-3 rounded"
  />

  <input
    name="city"
    required
    placeholder="City / Region"
    className="w-full border p-3 rounded"
  />

  <textarea
    name="message"
    placeholder="Tell us about your distribution experience"
    className="w-full border p-3 rounded"
  />

  <button
    type="submit"
    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
  >
    Submit Request
  </button>
</form>
    </div>
  </div>
)}
      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Virasat Organics?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Certified Organic', desc: 'No synthetic pesticides or fertilizers' },
            { title: 'Fast Delivery', desc: 'Fresh products within 24-48 hours' },
            { title: 'Quality Guaranteed', desc: 'Highest quality standards assured' },
            { title: 'Eco-Friendly', desc: 'Sustainable packaging & practices' },
          ].map((feature) => (
            <div key={feature.title} className="border border-green-100 rounded p-6">
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
     

      {/* CTA */}
      <section className="bg-green-600 py-16 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Go Organic?</h2>
        <p className="text-lg text-green-100 mb-6">Join thousands of satisfied customers</p>
        <Link href="/products" className="inline-block px-8 py-3 bg-white text-green-600 rounded hover:bg-gray-100 font-semibold">
          Start Shopping
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Virasat Organics. Spreading the essence of organic living.</p>
        </div>
      </footer>
    </main>
  )
}
