"use client"

import { useEffect, useState, useRef } from "react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadCategories = async () => {
    const res = await fetch("/api/admin/categories")
    const data = await res.json()
    setCategories(data)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const uploadImage = async () => {
    if (!imageFile) return null

    const formData = new FormData()
    formData.append("type", "category")
    formData.append("file", imageFile)

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Upload failed")
      return null
    }

    return data.url  // ✅ FIXED
  }

  const addOrUpdateCategory = async () => {
    if (!name) return alert("Enter category name")

    let image_url = null

    if (imageFile) {
      image_url = await uploadImage()
    }

    if (editingId) {
      await fetch(`/api/admin/categories/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image_url }),
      })
      setEditingId(null)
    } else {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image_url }),
      })
    }

    // Reset everything
    setName("")
    setImageFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""  // ✅ FILE RESET FIX
    }

    loadCategories()
  }

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    })

    loadCategories()
  }

  const editCategory = (category: any) => {
    setEditingId(category.id)
    setName(category.name)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      {/* Add / Edit */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-center">
        <input
          className="border p-2 flex-1"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
        />

        <button
          onClick={addOrUpdateCategory}
          className="bg-green-600 text-white px-4 rounded"
        >
          {editingId ? "Update" : "Add"}
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
                      className="w-14 h-14 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => editCategory(c)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

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