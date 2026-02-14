'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
export function StorefrontHeader() {
  const router = useRouter()
  // const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    // try {
    //   const { data: { user } } = await supabase.auth.getUser()
    //   setUser(user)

    //   if (user) {
    //     // Fetch cart count
    //     const { data: cartItems } = await supabase
    //       .from('cart_items')
    //       .select('id', { count: 'exact' })
    //       .eq('user_id', user.id)

    //     if (cartItems) {
    //       setCartCount(cartItems.length)
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error checking user:', error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const handleLogout = async () => {
    // await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const handleAddToCartClick = () => {
    if (!user) {
      router.push('/auth/login')
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">Virasat</span>
            <span className="text-sm text-gray-600">Organics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
            ) : user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-700">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link href="/cart-page" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart-page" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link href="/products" className="block text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-green-600">
              Contact
            </Link>
            <div className="border-t pt-4 space-y-2">
              {isLoading ? (
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              ) : user ? (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start text-gray-700">
                      <User className="mr-2 h-5 w-5" /> Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
