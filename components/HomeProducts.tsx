"use client"

import { useEffect, useState } from "react"


import { useRouter } from "next/navigation"


// import MainHeader from "../components/MainHeader"

export default function HomeProducts() {
  const [data, setData] = useState<any>({})
  const router = useRouter()


  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(products => {
        // Group by category
        const grouped: any = {}

        products.forEach((p: any) => {
          const cat = p.category_name || "Others"
          if (!grouped[cat]) grouped[cat] = []
          grouped[cat].push(p)
        })

        setData(grouped)
      })
  }, [])

  // Calculate discount badge
  const getDiscount = (mrp: any, discount: any) => {
  const MRP = Number(mrp)
  const DIS = Number(discount)

  if (!DIS || DIS <= 0 || DIS >= MRP) return null

  const percent = ((MRP - DIS) / MRP) * 100
  const rounded = Math.floor(percent / 5) * 5

  if (rounded <= 0) return null

  return rounded
}


  return (
    

    
    <div className="bg-[#f7f7f7] py-10">

      
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {Object.keys(data).map(category => (
          <div key={category}>

            {/* Category Title */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {category}
              </h2>
              <a href={`/products?category=${category}`} className="text-sm text-green-700">
                View all
              </a>
            </div>

            {/* Products Grid */}
           {/* Products Horizontal Scroll */}
<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

  {data[category].map((p: any) => {
    const discountPercent = getDiscount(p.price, p.discount_price)

    return (
      <div
        key={p.id}
        onClick={() => router.push(`/products/${p.id}`)}
        className="min-w-[220px] max-w-[220px] bg-white rounded-xl border hover:shadow-xl transition relative p-4 cursor-pointer"
      >

        {/* Badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
            {discountPercent}% OFF
          </div>
        )}

        {/* Image */}
        <div className="h-44 flex items-center justify-center mb-3">
          <img
            src={
              p.image_url && p.image_url.trim() !== ""
                ? p.image_url
                : "/uploads/1771253858561-logo.jpeg"
            }
            alt={p.title}
            className="max-h-full object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
          {p.title}
        </h3>

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          {p.discount_price &&
          Number(p.discount_price) < Number(p.price) ? (
            <>
              <span className="text-green-700 font-bold text-lg">
                ₹{p.discount_price}
              </span>
              <span className="text-gray-400 line-through text-sm">
                ₹{p.price}
              </span>
            </>
          ) : (
            <span className="text-green-700 font-bold text-lg">
              ₹{p.price}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            console.log("Add to cart:", p.id)
          }}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
        >
          Add to Cart
        </button>
      </div>
    )
  })}
</div>
          </div>
        ))}

      </div>
    </div>
  
  )
}
