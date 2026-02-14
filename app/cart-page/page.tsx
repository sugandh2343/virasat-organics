'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
import { StorefrontHeader } from '@/components/storefront/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, ShoppingCart } from 'lucide-react'

interface CartItem {
  id: string
  product_id: string
  product_name: string
  price: number
  quantity: number
  variant_id?: string
  variant_name?: string
}

const B2B_DISCOUNT_THRESHOLD = 5 // 5% off for B2B on orders with 5+ quantity

export default function CartPage() {
  const router = useRouter()
  // const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthAndLoadCart()
  }, [])

  const checkAuthAndLoadCart = async () => {
    try {
      // const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      // Load user profile
      // const { data: profileData } = await supabase
      //   .from('user_profiles')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .single()

      // if (profileData) setProfile(profileData)

      // Load cart items
      // const { data: itemsData } = await supabase
        // .from('cart_items')
        // .select(`
        //   id,
        //   product_id,
        //   quantity,
        //   variant_id,
        //   products(name, price),
        //   product_variants(variant_name)
        // `)
        // .eq('user_id', user.id)

      // if (itemsData) {
      //   const formatted = itemsData.map((item: any) => ({
      //     id: item.id,
      //     product_id: item.product_id,
      //     product_name: item.products?.name || 'Unknown',
      //     price: item.products?.price || 0,
      //     quantity: item.quantity,
      //     variant_id: item.variant_id,
      //     variant_name: item.product_variants?.variant_name,
      //   }))
      //   setCartItems(formatted)
      // }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    // try {
    //   await supabase
    //     .from('cart_items')
    //     .update({ quantity: newQuantity })
    //     .eq('id', cartItemId)

    //   setCartItems(items =>
    //     items.map(item =>
    //       item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    //     )
    //   )
    // } catch (error) {
    //   console.error('Error updating quantity:', error)
    // }
  }

  const handleRemoveItem = async (cartItemId: string) => {
    // try {
    //   await supabase
    //     .from('cart_items')
    //     .delete()
    //     .eq('id', cartItemId)

    //   setCartItems(items => items.filter(item => item.id !== cartItemId))
    // } catch (error) {
    //   console.error('Error removing item:', error)
    // }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateDiscount = () => {
    if (profile?.user_type !== 'B2B') return 0

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    if (totalQuantity >= B2B_DISCOUNT_THRESHOLD) {
      return calculateSubtotal() * 0.05 // 5% discount
    }
    return 0
  }

  const subtotal = calculateSubtotal()
  const discount = calculateDiscount()
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <StorefrontHeader />
        <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.product_name}</h3>
                        {item.variant_name && (
                          <p className="text-sm text-gray-600">{item.variant_name}</p>
                        )}
                        <p className="text-lg font-bold text-green-600 mt-2">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 text-center"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.user_type === 'B2B' && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm font-medium text-blue-900">
                        Business Account Benefits
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0) >= B2B_DISCOUNT_THRESHOLD
                          ? '5% discount applied on orders with 5+ items'
                          : `Order 5+ items to unlock 5% discount`}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>B2B Discount (5%)</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">FREE</span>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 py-6">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 text-center">
                      Free shipping on orders over ₹500
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
