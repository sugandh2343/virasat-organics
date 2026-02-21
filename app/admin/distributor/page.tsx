"use client"

import { useEffect, useState } from "react"

export default function DistributorAdminPage() {
  const [data, setData] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch("/api/distributor")
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Distributor Enquiries
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Business</th>
                <th className="p-4 text-left">City</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 font-medium">
                    {d.name}
                  </td>

                  <td className="p-4">
                    {d.business_name}
                  </td>

                  <td className="p-4">
                    {d.city}
                  </td>

                  <td className="p-4">
                    {d.mobile}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelected(d)}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative shadow-2xl">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6">
              Distributor Details
            </h2>

            <div className="space-y-3 text-sm">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Business:</strong> {selected.business_name}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Mobile:</strong> {selected.mobile}</p>
              <p><strong>City:</strong> {selected.city}</p>
              <p><strong>Message:</strong></p>
              <p className="bg-gray-100 p-3 rounded">
                {selected.message}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}