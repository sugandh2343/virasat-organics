"use client"

import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    sales: 0,
  })

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  const Card = ({ title, value }: any) => (
    <div className="bg-white shadow rounded p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Orders" value={stats.orders} />
        <Card title="Total Users" value={stats.users} />
        <Card title="Total Products" value={stats.products} />
        <Card title="Total Sales (₹)" value={stats.sales} />
      </div>
    </div>
  )
}
