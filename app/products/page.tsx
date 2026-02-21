'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
// import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import MainHeader from '@/components/MainHeader'



interface Product {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  stock_quantity: number
}

interface Category {
  id: string
  name: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const [data, setData] = useState<any>({})
  const router = useRouter()


  // const supabase = createClient()

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
        setLoading(false)
      })
  }, [])


   const getDiscount = (mrp: any, discount: any) => {
  const MRP = Number(mrp)
  const DIS = Number(discount)

  if (!DIS || DIS <= 0 || DIS >= MRP) return null

  const percent = ((MRP - DIS) / MRP) * 100
  const rounded = Math.floor(percent / 5) * 5

  if (rounded <= 0) return null

  return rounded
}
  const handleAddToCart = async (product: Product) => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // try {
    //   await supabase.from('cart_items').insert({
    //     user_id: user.id,
    //     product_id: product.id,
    //     quantity: 1,
    //   })
    //   alert('Added to cart!')
    // } catch (error) {
    //   console.error('Error adding to cart:', error)
    //   alert('Error adding to cart')
    // }
  }

  const handleLogout = async () => {
    // await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_id === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-gray-50">
    <>
      <MainHeader/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop Products</h1>

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
                   
  onClick={() => {
    console.log("Product clicked:", p.id)
    router.push(`/products/${p.id}`)
  }}
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
                      <img
  src={p.image_url && p.image_url.trim() !== "" 
    ? p.image_url 
    : "/uploads/1771253858561-logo.jpeg"}
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
      </>
    </div>
  )
}
