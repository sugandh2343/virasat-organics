'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
// import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  // const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const { data: { user } } = await supabase.auth.getUser()
      //   setUser(user)

      //   // Fetch categories
      //   const { data: catData } = await supabase.from('categories').select('*')
      //   if (catData) setCategories(catData)

      //   // Fetch products
      //   const { data: prodData } = await supabase.from('products').select('*').eq('is_active', true)
      //   if (prodData) setProducts(prodData)
      // } catch (error) {
      //   console.error('Error fetching data:', error)
      // } finally {
      //   setLoading(false)
      // }
    }

    fetchData()
  }, [])

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
      {/* Header */}
      <nav className="border-b border-green-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-700">
            Virasat Organics
          </Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Link href="/profile">
                  <Button variant="outline" size="sm">Profile</Button>
                </Link>
                <Link href="/cart-page">
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop Products</h1>

        {/* Categories */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
              selectedCategory === ''
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock_quantity}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
