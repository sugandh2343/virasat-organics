"use client"

import { useEffect, useState } from "react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)


  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discount_price: "",
    quantity: "",
    unit: "kg",
    image_url: "",
    category_id: "",
    search_keywords: "",
  })

  const loadData = async () => {
    const p = await fetch("/api/admin/products", { cache: "no-store" })
    setProducts(await p.json())

    const c = await fetch("/api/admin/categories", { cache: "no-store" })
    setCategories(await c.json())
  }

  useEffect(() => {
    loadData()
  }, [])

  const saveProduct = async () => {
  const url = editingProduct
    ? `/api/admin/products/${editingProduct.id}`
    : "/api/admin/products"

  const method = editingProduct ? "PUT" : "POST"

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      price: Number(form.price),
      discount_price: form.discount_price
        ? Number(form.discount_price)
        : null,
      quantity: Number(form.quantity),
      category_id: form.category_id
        ? Number(form.category_id)
        : null,
    }),
  })

  setEditingProduct(null)
  setShowForm(false)
  loadData()
}

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete product?")) return

    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    })

    loadData()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input className="border p-2" placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <select className="border p-2"
            value={form.category_id}
            onChange={e => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="border p-2 col-span-2" placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

         <button
  type="button"
  className="bg-purple-600 text-white p-2 col-span-2"
  onClick={async () => {
    if (!form.title) {
      alert("Enter product title first")
      return
    }

    const res = await fetch("/api/admin/ai-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title }),
    })

    const data = await res.json()

    // Split description & keywords
    const parts = data.content.split("Keywords:")

    setForm({
      ...form,
      description: parts[0].replace("Description:", "").trim(),
      search_keywords: parts[1]?.trim() || "",
      image_url: data.image_url,
    })
  }}
>
  Generate with AI
</button>



          <input className="border p-2" placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <input className="border p-2" placeholder="Discount Price"
            value={form.discount_price}
            onChange={e => setForm({ ...form, discount_price: e.target.value })}
          />

          <input className="border p-2" placeholder="Quantity"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />

          <select className="border p-2"
            value={form.unit}
            onChange={e => setForm({ ...form, unit: e.target.value })}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="pkt">pkt</option>
            <option value="bag">bag</option>
          </select>

          <input
  type="file"
  className="border p-2 col-span-2"
  onChange={async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    setForm({
      ...form,
      image_url: data.url,
    })
  }}
/>


          <input className="border p-2 col-span-2"
            placeholder="Search keywords"
            value={form.search_keywords}
            onChange={e => setForm({ ...form, search_keywords: e.target.value })}
          />

          <button
            onClick={saveProduct}
            className="bg-green-600 text-white p-2 col-span-2"
          >
            Save Product
          </button>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
  <table className="w-full table-fixed">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-3 w-20 text-left">Image</th>
        <th className="p-3 w-48 text-left">Title</th>
        <th className="p-3 w-40 text-left">Category</th>
        <th className="p-3 w-24 text-left">Price</th>
        <th className="p-3 w-24 text-left">Discount</th>
        <th className="p-3 w-24 text-left">Qty</th>
        <th className="p-3 text-left">Keywords</th>
        <th className="p-3 w-32 text-left">Actions</th>
      </tr>
    </thead>

    <tbody>
      {products.map((p) => (
        <tr key={p.id} className="border-t align-top">
          {/* Image */}
          <td className="p-3 w-20">
            {p.image_url ? (
              <img
                src={p.image_url}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs text-center">
                No Image
              </div>
            )}
          </td>

          {/* Title + Description */}
          <td className="p-3 w-48">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-500 line-clamp-2">
              {p.description}
            </div>
          </td>

          <td className="p-3 w-40">{p.category_name}</td>
          <td className="p-3 w-24">₹{p.price}</td>
          <td className="p-3 w-24">
            {p.discount_price ? `₹${p.discount_price}` : "-"}
          </td>
          <td className="p-3 w-24">
            {p.quantity} {p.unit}
          </td>

          <td className="p-3 break-words">
            {p.search_keywords}
          </td>

          <td className="p-3 w-32">
            <div className="flex gap-2">
             <button
  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
  onClick={() => {
    setShowForm(true)
    setEditingProduct(p)
    setForm({
      title: p.title || "",
      description: p.description || "",
      price: p.price || "",
      discount_price: p.discount_price || "",
      quantity: p.quantity || "",
      unit: p.unit || "kg",
      image_url: p.image_url || "",
      category_id: p.category_id || "",
      search_keywords: p.search_keywords || "",
    })
  }}
>
  Edit
</button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}
