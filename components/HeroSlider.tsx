"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/banners/banner2.jpeg",
    title: "Pure Organic Living",
    subtitle: "Farm Fresh. Chemical Free.",
  },
  {
    id: 2,
    image: "/banners/banner2.jpeg",
    title: "Healthy Grains & Pulses",
    subtitle: "Straight From Trusted Farmers",
  },
  {
    id: 3,
    image: "/banners/banner2.jpeg",
    title: "Premium Organic Atta",
    subtitle: "100% Pure Whole Wheat",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[55vh] md:h-[65vh] lg:h-[75vh]">

        {/* Image */}
        <Image
          src={slides[current].image}
          alt="Hero"
          fill
          priority
          className="object-cover object-center transition-all duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl mb-6">
            {slides[current].subtitle}
          </p>

          <div className="flex gap-4">
            <button className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Shop Now
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
              Explore
            </button>
          </div>
        </div>

      </div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}