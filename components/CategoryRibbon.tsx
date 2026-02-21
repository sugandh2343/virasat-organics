"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/components/images/logo.jpeg"

interface Category {
  id: number
  name: string
  image_url?: string | null
}

export default function CategoryRibbon() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch("/api/admin/categories")
      .then(res => res.json())
      .then(data => setCategories(data || []))
      .catch(() => setCategories([]))
  }, [])

  return (
    <section className="w-full bg-white py-10 border-b">
      
      <div className="px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Shop by Category
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-10 overflow-x-auto px-6 pb-4 scrollbar-hide">

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="flex flex-col items-center min-w-[120px] group"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-green-50 flex items-center justify-center shadow-sm group-hover:shadow-xl transition duration-300 group-hover:scale-105">

              <Image
                src={category.image_url || logo}
                alt={category.name}
                width={90}
                height={90}
                className="rounded-full object-cover"
              />

            </div>

            <span className="text-sm mt-4 text-gray-700 text-center group-hover:text-green-600 transition font-medium">
              {category.name}
            </span>
          </Link>
        ))}

      </div>
    </section>
  )
}