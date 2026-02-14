"use client"

import { useEffect, useState } from "react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const loadCategories = async () => {
    const res = await fetch("/api/admin/categories")
    const data = await res.json()
    setCategories(data)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const addCategory = async () => {
    if (!name) return alert("Enter category name")

    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        image_url: image,
      }),
    })

    setName("")
    setImage("")
    loadCategories()
  }

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    })

    loadCategories()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      {/* Add Category */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
        <input
          className="border p-2 flex-1"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">
                  {c.image_url && (
                    <img
                      src={c.image_url}
                      className="w-12 h-12 object-cover"
                    />
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
