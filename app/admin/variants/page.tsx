'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Edit } from 'lucide-react'

interface Variant {
  id: string
  product_id: string
  variant_name: string
  variant_type: 'size' | 'color' | 'combined'
  size_value?: string
  color_value?: string
  price_adjustment: number
  stock_quantity: number
  is_active: boolean
}

interface Product {
  id: string
  name: string
}

export default function VariantsPage() {
  // const supabase = createClient()
  const [products, setProducts] = useState<Product[]>([])
  const [variants, setVariants] = useState<(Variant & { product_name: string })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string>('')

  const [formData, setFormData] = useState({
    variant_name: '',
    variant_type: 'size' as 'size' | 'color' | 'combined',
    size_value: '',
    color_value: '',
    price_adjustment: 0,
    stock_quantity: 0,
  })

  // useEffect(() => {
  //   loadData()
  // }, [])

  // const loadData = async () => {
  //   try {
  //     // Load products
  //     const { data: productsData } = await supabase
  //       .from('products')
  //       .select('id, name')
  //       .order('name')

  //     if (productsData) setProducts(productsData)

  //     // Load variants
  //     const { data: variantsData } = await supabase
  //       .from('product_variants')
  //       .select('*, products(name)')
  //       .order('created_at', { ascending: false })

  //     if (variantsData) {
  //       setVariants(variantsData.map((v: any) => ({
  //         ...v,
  //         product_name: v.products?.name || 'Unknown'
  //       })))
  //     }
  //   } catch (error) {
  //     console.error('Error loading data:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleAddVariant = async () => {
  //   if (!selectedProduct) {
  //     alert('Please select a product')
  //     return
  //   }

  //   try {
  //     const { error } = await supabase
  //       .from('product_variants')
  //       .insert({
  //         product_id: selectedProduct,
  //         ...formData,
  //       })

  //     if (error) throw error

  //     alert('Variant added successfully')
  //     setIsDialogOpen(false)
  //     resetForm()
  //     loadData()
  //   } catch (error) {
  //     console.error('Error adding variant:', error)
  //     alert('Error adding variant')
  //   }
  // }

  // const handleUpdateVariant = async () => {
  //   if (!editingVariant) return

  //   try {
  //     const { error } = await supabase
  //       .from('product_variants')
  //       .update(formData)
  //       .eq('id', editingVariant.id)

  //     if (error) throw error

  //     alert('Variant updated successfully')
  //     setIsDialogOpen(false)
  //     setEditingVariant(null)
  //     resetForm()
  //     loadData()
  //   } catch (error) {
  //     console.error('Error updating variant:', error)
  //     alert('Error updating variant')
  //   }
  // }

  // const handleDeleteVariant = async (id: string) => {
  //   if (!confirm('Are you sure you want to delete this variant?')) return

  //   try {
  //     const { error } = await supabase
  //       .from('product_variants')
  //       .delete()
  //       .eq('id', id)

  //     if (error) throw error

  //     alert('Variant deleted successfully')
  //     loadData()
  //   } catch (error) {
  //     console.error('Error deleting variant:', error)
  //     alert('Error deleting variant')
  //   }
  // }

  const resetForm = () => {
    setFormData({
      variant_name: '',
      variant_type: 'size',
      size_value: '',
      color_value: '',
      price_adjustment: 0,
      stock_quantity: 0,
    })
    setSelectedProduct('')
  }

  const openEditDialog = (variant: Variant & { product_name: string }) => {
    setEditingVariant(variant)
    setFormData({
      variant_name: variant.variant_name,
      variant_type: variant.variant_type,
      size_value: variant.size_value || '',
      color_value: variant.color_value || '',
      price_adjustment: variant.price_adjustment,
      stock_quantity: variant.stock_quantity,
    })
    setIsDialogOpen(true)
  }

  if (!isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Variants</h1>
          <p className="text-gray-600">Manage sizes, colors, and other product variations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              setEditingVariant(null)
              resetForm()
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Variant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVariant ? 'Edit Variant' : 'Add New Variant'}</DialogTitle>
              <DialogDescription>
                {editingVariant ? 'Update the variant details' : 'Create a new product variant with size, color or other options'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {!editingVariant && (
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="variantName">Variant Name</Label>
                <Input
                  id="variantName"
                  placeholder="e.g., 500g Pack"
                  value={formData.variant_name}
                  onChange={(e) => setFormData({ ...formData, variant_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="variantType">Variant Type</Label>
                <Select value={formData.variant_type} onValueChange={(value) => setFormData({ ...formData, variant_type: value as 'size' | 'color' | 'combined' })}>
                  <SelectTrigger id="variantType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="combined">Size + Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.variant_type === 'size' || formData.variant_type === 'combined') && (
                <div className="space-y-2">
                  <Label htmlFor="sizeValue">Size Value</Label>
                  <Input
                    id="sizeValue"
                    placeholder="e.g., 500g, 1kg, 2kg"
                    value={formData.size_value}
                    onChange={(e) => setFormData({ ...formData, size_value: e.target.value })}
                  />
                </div>
              )}

              {(formData.variant_type === 'color' || formData.variant_type === 'combined') && (
                <div className="space-y-2">
                  <Label htmlFor="colorValue">Color Value</Label>
                  <Input
                    id="colorValue"
                    placeholder="e.g., Red, Blue, Green"
                    value={formData.color_value}
                    onChange={(e) => setFormData({ ...formData, color_value: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="priceAdjustment">Price Adjustment (₹)</Label>
                <Input
                  id="priceAdjustment"
                  type="number"
                  step="0.01"
                  placeholder="Additional price for this variant"
                  value={formData.price_adjustment}
                  onChange={(e) => setFormData({ ...formData, price_adjustment: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  placeholder="How many units available"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingVariant ? 'Update Variant' : 'Add Variant'}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Variants</CardTitle>
          <CardDescription>Total: {variants.length} variants</CardDescription>
        </CardHeader>
        <CardContent>
          {variants.length === 0 ? (
            <p className="text-gray-500">No variants yet. Create one to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Product</th>
                    <th className="text-left py-2 px-2">Variant Name</th>
                    <th className="text-left py-2 px-2">Type</th>
                    <th className="text-left py-2 px-2">Size</th>
                    <th className="text-left py-2 px-2">Color</th>
                    <th className="text-left py-2 px-2">Price Adj.</th>
                    <th className="text-left py-2 px-2">Stock</th>
                    <th className="text-left py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2">{variant.product_name}</td>
                      <td className="py-2 px-2">{variant.variant_name}</td>
                      <td className="py-2 px-2 text-sm">{variant.variant_type}</td>
                      <td className="py-2 px-2">{variant.size_value || '-'}</td>
                      <td className="py-2 px-2">{variant.color_value || '-'}</td>
                      <td className="py-2 px-2">₹{variant.price_adjustment.toFixed(2)}</td>
                      <td className="py-2 px-2">{variant.stock_quantity}</td>
                      <td className="py-2 px-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(variant)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
