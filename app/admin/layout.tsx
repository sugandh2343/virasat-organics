"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow">
        <div className="p-6 font-bold text-xl border-b">
          Virasat Admin
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block p-2 rounded ${
                pathname === item.path
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
