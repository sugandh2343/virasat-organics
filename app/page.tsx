'use client'

import Link from 'next/link'
import Image from 'next/image'

import logo from '@/components/images/logo.jpeg'
import Navbar from "@/components/Navbar"

import MainHeader from "@/components/MainHeader"
import HeroSlider from "@/components/HeroSlider"

import NavMenu from "@/components/NavMenu"
import HomeProducts from '@/components/HomeProducts'

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Navigation */}
      <main>
     <MainHeader />
      <NavMenu />
      <HeroSlider />
      <HomeProducts/>
    </main>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700">
            <span className="text-sm font-medium">100% Organic & Eco-Friendly</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
            Pure Organic, <span className="text-green-600">Delivered Fresh</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium organic groceries and eco-friendly products sourced directly from trusted farms across India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="inline-block px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700">
              Shop Now
            </Link>
            <Link href="#features" className="inline-block px-8 py-3 border border-gray-300 rounded hover:border-gray-400">
              Learn More
            </Link>
          </div>
        </div>
      </section>

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
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
             
              { name: 'Grains & Pulses', emoji: '🌾' },
            
              { name: 'Spices', emoji: '🧂' },
              
            ].map((category) => (
              <Link key={category.name} href={`/products?category=${category.name.toLowerCase()}`}>
                <div className="border border-gray-200 rounded p-6 hover:shadow-lg transition-shadow text-center cursor-pointer">
                  <div className="text-5xl mb-3">{category.emoji}</div>
                  <p className="font-semibold text-lg">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
