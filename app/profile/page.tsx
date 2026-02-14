'use client'

import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StorefrontHeader } from '@/components/storefront/header'
import { Loader } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  // const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [addresses, setAddresses] = useState<any[]>([])
  const [editMode, setEditMode] = useState(false)

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const { data: { user } } = await supabase.auth.getUser()
  //       if (!user) {
  //         router.push('/auth/login')
  //         return
  //       }

  //       setUser(user)

  //       // Fetch user profile
  //       const { data: profileData, error: profileError } = await supabase
  //         .from('user_profiles')
  //         .select('*')
  //         .eq('user_id', user.id)
  //         .single()

  //       if (!profileError && profileData) {
  //         setProfile(profileData)
  //       }

  //       // Fetch user orders
  //       const { data: ordersData, error: ordersError } = await supabase
  //         .from('orders')
  //         .select(`
  //           *,
  //           order_items(
  //             *,
  //             products(name, price)
  //           )
  //         `)
  //         .eq('user_id', user.id)
  //         .order('created_at', { ascending: false })

  //       if (!ordersError && ordersData) {
  //         setOrders(ordersData)
  //       }

  //       // Fetch saved addresses
  //       const { data: addressesData, error: addressesError } = await supabase
  //         .from('saved_addresses')
  //         .select('*')
  //         .eq('user_id', user.id)

  //       if (!addressesError && addressesData) {
  //         setAddresses(addressesData)
  //       }
  //     } catch (error) {
  //       console.error('Error loading profile:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   loadData()
  // }, [supabase, router])

  const handleSaveProfile = async () => {
    if (!user || !profile) return

    setIsSaving(true)
    // try {
    //   const { error } = await supabase
    //     .from('user_profiles')
    //     .update({
    //       first_name: profile.first_name,
    //       last_name: profile.last_name,
    //       phone_number: profile.phone_number,
    //       user_type: profile.user_type,
    //       company_name: profile.company_name,
    //       company_gstin: profile.company_gstin,
    //     })
    //     .eq('user_id', user.id)

    //   if (error) throw error
    //   setEditMode(false)
    //   alert('Profile updated successfully')
    // } catch (error) {
    //   console.error('Error saving profile:', error)
    //   alert('Error saving profile')
    // } finally {
    //   setIsSaving(false)
    // }
  }

  const handleLogout = async () => {
    // await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <StorefrontHeader />
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 text-green-600 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">First Name</Label>
                        <p className="mt-1 text-lg">{profile?.first_name || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                        <p className="mt-1 text-lg">{profile?.last_name || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="mt-1 text-lg">{user?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone Number</Label>
                      <p className="mt-1 text-lg">{profile?.phone_number || 'Not added'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Account Type</Label>
                      <div className="mt-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          profile?.user_type === 'B2B'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {profile?.user_type === 'B2B' ? 'Business Account' : 'Personal Account'}
                        </span>
                      </div>
                    </div>

                    {profile?.user_type === 'B2B' && (
                      <>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                          <p className="mt-1 text-lg">{profile?.company_name || 'Not added'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">GSTIN</Label>
                          <p className="mt-1 text-lg">{profile?.company_gstin || 'Not added'}</p>
                        </div>
                      </>
                    )}

                    <Button onClick={() => setEditMode(true)} className="bg-green-600 hover:bg-green-700">
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile?.first_name || ''}
                          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile?.last_name || ''}
                          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile?.phone_number || ''}
                        onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                      />
                    </div>

                    {profile?.user_type === 'B2B' && (
                      <>
                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={profile?.company_name || ''}
                            onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gstin">GSTIN</Label>
                          <Input
                            id="gstin"
                            value={profile?.company_gstin || ''}
                            onChange={(e) => setProfile({ ...profile, company_gstin: e.target.value })}
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button onClick={() => setEditMode(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500">No orders yet. Start shopping!</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">Order #{order.order_number}</p>
                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-lg font-semibold">₹{parseFloat(order.total_amount).toFixed(2)}</div>
                        {order.order_items && (
                          <div className="text-sm text-gray-600">
                            {order.order_items.length} item(s)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </CardHeader>
              <CardContent>
                {addresses.length === 0 ? (
                  <p className="text-gray-500">No saved addresses. Add one during checkout.</p>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold capitalize">{address.address_type}</p>
                          {address.is_default && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{address.address_line_1}</p>
                        {address.address_line_2 && <p className="text-sm">{address.address_line_2}</p>}
                        <p className="text-sm">{address.city}, {address.state} {address.postal_code}</p>
                        {address.phone_number && <p className="text-sm">Phone: {address.phone_number}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
