"use client"

import { useEffect, useState } from "react"

export default function HomeProducts() {
  const [data, setData] = useState<any>({})

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {data[category].map((p: any) => {
                const discountPercent = getDiscount(p.price, p.discount_price)

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-lg border hover:shadow-lg transition relative p-4"
                  >

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {discountPercent
                        ? `${discountPercent}% OFF`
                        : "SALE"}
                    </div>

                    {/* Image */}
                    <div className="h-44 flex items-center justify-center mb-3">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          className="max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      {p.title}
                    </h3>

                    {/* Price */}
                <div className="mb-3 flex items-center gap-2">
  {p.discount_price && Number(p.discount_price) < Number(p.price) ? (
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
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm">
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
